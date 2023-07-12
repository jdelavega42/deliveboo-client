<script>
export default {
    name: "HeaderMenu"
}
</script>

<template>
<nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container">                    
        <router-link
            :to="{ name: 'home'}"
            role="button">
             <a class="navbar-brand" href="#">
                <img src="../assets/img/db_logo.png" alt="" class="img-fluid smaller-image" width="220">
            </a>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link
                      :to="{ name: 'home'}"
                      role="button">
                      <a class="nav-link text-decoration-none" href="#">Home</a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="http://localhost:8000">Sei un ristoratore?</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contatti</a>
                </li>
                <li class="nav-item">
                </li>
            </ul>
        </div>
        <button class="btn btn-link" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <i class="fa-solid fa-cart-shopping"></i>
        </button>
    </div>
</nav>

</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;

.header-menu {
    height: 80px;
    box-shadow: 0 4px 2px -2px gray;

    .smaller-image {
    max-width: 50%;
    height: auto;
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

@media (max-width: 768px) {
    .header-menu {
        padding: 10px;
    }
    .header-menu img {
        width: 50%;
    }
    .header-menu ul {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .header-menu ul li {
        margin-bottom: 10px;
    }
}
</style>