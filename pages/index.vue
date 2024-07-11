<template>
	<div class="min-h-screen bg-white text-black flex justify-center items-center">
		<div class="max-w-3xl mx-auto p-8 border border-black">
			<h1 class="text-4xl font-bold mb-8">Subsync Dashboard</h1>

			<ul class="divide-y divide-white">
				<li class="py-4 flex items-center">
					<span class="inline-block w-4 h-4 bg-black mr-2"></span>
					<router-link to="/qbit" class="block text-xl font-bold hover:underline">qBittorrent
						Downloads</router-link>
				</li>

				<li class="py-4 flex items-center">
					<span class="inline-block w-4 h-4 bg-black mr-2"></span>
					<router-link to="/subsync" class="block text-xl font-bold hover:underline">Sync Subtitles To
						Movie</router-link>
				</li>

				<li class="py-4 flex items-center">
					<span class="inline-block w-4 h-4 bg-black mr-2"></span>
					<router-link to="/options" class="block text-xl font-bold hover:underline">Options</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

body {
	font-family: 'VT323', monospace;
}

ul li span {
	width: 0.5rem;
	height: 0.5rem;
	background-color: #000;
}
</style>
  