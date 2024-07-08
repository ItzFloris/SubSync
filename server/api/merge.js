export default defineEventHandler(async (event) => {
    if (event.req.method === 'POST') {
      const formData = await readBody(event);
      const videoFile = formData.get('video');
      const subtitleFile = formData.get('subtitle');
      
      // Process the files and call the FFmpeg middleware
      const ffmpegHandler = await import('~~/server/middleware/ffmpeg');
      return await ffmpegHandler.default(event);
    } else {
      return { status: 405, message: 'Method not allowed' };
    }
  });
  