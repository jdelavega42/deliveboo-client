<script>
import { store } from '../store';
export default {
    name: "CartOffcanvas",
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Carrello</h5>
        </div>
        <div class="offcanvas-body">
            Qui c'é il riepilogo del carrello
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;</style>