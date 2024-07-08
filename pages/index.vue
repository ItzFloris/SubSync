<template>
    <div>
        <h1>Video and Subtitle Merger</h1>
        <form @submit.prevent="addToQueue">
            <div>
                <label for="video">Video File:</label>
                <input type="file" id="video" ref="video" required />
            </div>
            <div>
                <label for="subtitle">Subtitle File:</label>
                <input type="file" id="subtitle" ref="subtitle" required />
            </div>
            <div>
                <label for="hardware">Hardware:</label>
                <select v-model="hardware">
                    <option value="cpu">CPU</option>
                    <option value="nvidia">NVIDIA</option>
                    <option value="amd">AMD</option>
                </select>
            </div>
            <button type="submit">Add to Queue</button>
        </form>
        <div v-if="progress > 0">
            <progress :value="progress" max="100"></progress>
            <p>{{ progress }}% Complete</p>
        </div>
        <div v-if="outputPath">
            <a :href="outputPath" download>Download Merged Video</a>
        </div>
        <div v-if="queue.length">
            <h2>Queue</h2>
            <ul>
                <li v-for="(item, index) in queue" :key="index">{{ item.video.name }} - {{ item.subtitle.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFetch } from '#app';

const video = ref(null);
const subtitle = ref(null);
const hardware = ref('cpu');
const progress = ref(0);
const outputPath = ref('');
const queue = ref([]);

const addToQueue = () => {
    const videoFile = video.value.files[0];
    const subtitleFile = subtitle.value.files[0];

    queue.value.push({ video: videoFile, subtitle: subtitleFile, hardware: hardware.value });
    processQueue();
};

const processQueue = async () => {
    if (!queue.value.length) return;

    const currentTask = queue.value[0];
    const formData = new FormData();
    formData.append('video', currentTask.video);
    formData.append('subtitle', currentTask.subtitle);
    formData.append('hardware', currentTask.hardware);

    const { data, error } = await useFetch('/api/merge', {
        method: 'POST',
        body: formData,
        onUploadProgress: (e) => {
            if (e.lengthComputable) {
                progress.value = (e.loaded / e.total) * 100;
            }
        },
    });

    if (error.value) {
        console.error(error.value);
    } else {
        outputPath.value = data.value.outputPath;
    }

    queue.value.shift();
    processQueue();
};
</script>

<style>
/* Add some basic styling */
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

button {
    margin-top: 1rem;
}
</style>
