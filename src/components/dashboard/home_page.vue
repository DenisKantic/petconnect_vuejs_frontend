<template>
    <div class="px-16">
        <h1 class="text-center py-5">Moji oglasi</h1>


   <AdoptPost />
   <DonationPost />
   <LostAnimalPage />
   <SosPost />
    </div>
</template>

<script>
import DonationPost from './donation_post.vue';
import AdoptPost from './adopt_post.vue';
import LostAnimalPage from './lost_animal_page.vue';
import SosPost from './sos_post.vue';

export default{
    components:{
        DonationPost,
        AdoptPost,
        LostAnimalPage,
        SosPost
    }
}
</script>

