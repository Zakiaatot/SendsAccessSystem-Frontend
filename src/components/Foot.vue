<template>
    <a-layout-footer class="foot animate__animated animate__fadeInUp">
        <div>&copy; Copyright<a-link href="link" status="success">Zakiaatot</a-link> 2022</div>
        <div>
            <span class="heart animate__animated animate__heartBeat animate__delay-1s animate__infinite">❤️</span>
            All from Sends, All for Sends.
        </div>
    </a-layout-footer>
</template>

<script setup>

</script>

<style scoped>
.foot {
    text-align: center;
    padding: 20px;
    border-top: 1px solid var(--color-border-2);
    overflow-x: hidden;
}

.foot div {
    margin-bottom: 5px;
    color: var(--color-text-1);
    font-size: 12px;
}

.foot div a {
    font-size: 12px;
}

.heart{
    display: inline-block;
    font-size: 16px;
}
</style>