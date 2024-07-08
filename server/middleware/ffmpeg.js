// server/middleware/ffmpeg.js
import { defineEventHandler } from 'h3';
import { exec } from 'child_process';
import { join } from 'path';
import formidable from 'formidable';
import queue from '../queue';

const uploadDir = 'uploads';
const maxFileSize = 20 * 1024 * 1024 * 1024; // 20 GB

export default defineEventHandler(async (event) => {
    const form = formidable({
        uploadDir,
        maxFileSize,
        multiples: true,
        keepExtensions: true,
    });

    return new Promise((resolve, reject) => {
        form.parse(event.req, (err, fields, files) => {
            if (err) {
                reject({ status: 500, message: 'File upload error' });
                return;
            }

            const videoPath = files.video.filepath;
            const subtitlePath = files.subtitle.filepath;
            const hardware = fields.hardware;
            const outputPath = join(uploadDir, `output-${Date.now()}.mp4`);

            queue.addTask(() => {
                return new Promise((resolveTask, rejectTask) => {
                    let command = `${ffmpegPath} -i ${videoPath} -vf subtitles=${subtitlePath} ${outputPath}`;

                    if (hardware === 'nvidia') {
                        command = `${ffmpegPath} -hwaccel cuda -i ${videoPath} -vf subtitles=${subtitlePath} ${outputPath}`;
                    } else if (hardware === 'amd') {
                        command = `${ffmpegPath} -hwaccel opencl -i ${videoPath} -vf subtitles=${subtitlePath} ${outputPath}`;
                    }

                    exec(command, (error, stdout, stderr) => {
                        if (error) {
                            rejectTask({ status: 500, message: stderr });
                            return;
                        }

                        resolveTask({ status: 200, message: 'Success', outputPath });
                    });
                }).then(resolve).catch(reject);
            });
        });
    });
});
