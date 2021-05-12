<template>
    <div>
        <my-header></my-header>  
        <div class="main"> 
            <container-index></container-index> 
        </div>
        <my-footer></my-footer>
    </div>

</template>
<script>

import myHeader from '../../components/header-g/index'
import ContainerIndex from '../container/ContainerIndex'
import myFooter from '../../components/footer-g/index'
export default {
    name:'Home',
    components:{
        myHeader,
        ContainerIndex,
        myFooter,
    },
    data(){
        return{  
        }
    },  
}
</script> 