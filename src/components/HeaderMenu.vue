<script>
export default {
    name: "HeaderMenu"
}
</script>

<template>
    <div class=" header-menu">
        <div class="d-flex justify-content-between align-items-center container h-100">

            <img src="../assets/img/db_logo.png" alt="">

            <div>
                <ul class="d-flex justify-content-between">
                    <li class="p-2"><a href="">Home</a></li>
                    <li class="p-2"><a href="http://localhost:8000">Sei un ristoratore?</a></li>
                    <li class="p-2"><a href="">Contatti</a>
                    </li>
                    <li class="p-2"><a href=""><i class="fa-solid fa-cart-shopping"></i></a></li>
                </ul>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;

.header-menu {
    height: 80px;
    box-shadow: 0 4px 2px -2px gray;
    // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    img {
        height: 80%;
    }

    ul {
        list-style-type: none;
        height: 100%;
        margin: 0;

        a {
            color: $primary-green;
            text-decoration: none;
            font-size: 1.2rem;
        }
    }
}
</style>