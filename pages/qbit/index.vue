<template>
    <div class="min-h-screen bg-white text-black flex justify-center items-center">
        <div class="mx-auto p-8 border border-black">
            <h1 class="text-4xl font-bold mb-8">Torrents</h1>
            <div v-if="torrents.length > 0">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y border border-black">
                        <thead class="border border-black">
                            <tr>
                                <th class="px-6 py-3 text-left">Name</th>
                                <th class="px-6 py-3 text-left">State</th>
                                <th class="px-6 py-3 text-left">Progress</th>
                                <th class="px-6 py-3 text-left">Size</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="torrent in torrents" :key="torrent.hash">
                                <td class="px-6 py-4 whitespace-nowrap">{{ torrent.name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ torrent.state }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ (torrent.progress * 100).toFixed(2) }}%</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ (torrent.size / (1024 * 1024)).toFixed(2) }} MB
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-else class="text-center mt-4">
                <p>No torrents available.</p>
            </div>

            <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useFetch } from '#app';

const torrents = ref([]);
const error = ref(null);

const { data, error: fetchError } = await useFetch('/api/qbittorrent');

if (data.value) {
    torrents.value = data.value;
} else if (fetchError.value) {
    error.value = fetchError.value.message;
    console.error(fetchError.value);
}
</script>
