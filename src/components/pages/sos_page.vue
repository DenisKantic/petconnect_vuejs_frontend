<template>
    <Navbar />  
    <SecondNavbar />

    <h1>SOS oglasi</h1>
</template>

<script>
import Navbar from '../navbar/main_navbar.vue';
import SecondNavbar from '../navbar/second_navbar.vue';

export default{
    components:{
        Navbar,
        SecondNavbar
    }
}
</script>