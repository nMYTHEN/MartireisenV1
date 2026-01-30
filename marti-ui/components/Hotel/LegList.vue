<template>
    <template  v-if="leg_list?.length > 0">
        <ul>
            <li v-for="leg in leg_list" :key="leg.id">
                <b>{{ `${leg.departureTime}-${leg.arrivalTime} ` }}</b>
                <small>({{ leg.estimatedElapsedTime  }})</small>
            </li>
        </ul>
    </template>
</template>

<script>

export default{
    props: ['leg_list']
}
</script>
