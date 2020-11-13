<template>
    <div class="minh">
        <div class="container pt-6" v-if="!loading">
            <!-- Heading -->
            <h1 class="title is-4">My Cart {{ '(' + cartProducts.total_product_count+ ')' }}</h1>
            <div class="columns is-paddingless is-marginless">
                <!-- First row -->
                <div class="column is-8 is-paddingless is-marginless productsWrapper">
                    <!-- Products Loop -->
                    <div class="cartProduct" v-for="(product,index) in cartProducts.data.products" :key="index">
                        <!-- Image -->
                        <ishtari-image :src="product.thumb"></ishtari-image>
                        <!-- info -->
                        <div class="info pl-5">
                            <div>
                                <p class="sku">{{product.sku}}</p>
                            <p class="name">{{product.name}}</p>
                            </div>
                            <div>
                                <span class="remove">
                                <i class="icon-trash"></i>
                                <span>Remove</span>
                            </span>
                            </div>
                        </div>
                        <!-- Price -->
                        <div class="priceWrapper">
                            <h2 class="price">{{product.total}}</h2>
                        </div>
                        <!-- Quantity -->
                        <div class="quantity">
                            <span>-</span>
                            <input type="number">
                            <span>+</span>
                        </div>
                    </div>
                </div>
                <!-- Second Row -->
                <div class="column is-4"></div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import IshtariImage from '@/components/global/IshtariImage'

export default {
    components:{
        IshtariImage
    },
    computed:{
        ...mapGetters({
            cartProducts:'cart/cartProducts',
            loading:'cart/loading'
        })
    }
}
</script>
<style scoped>
.productsWrapper{
    border:1px solid rgb(226, 229, 241);

}
.cartProduct{
    background:white;
    display: flex;
    padding:15px;
    border-bottom:1px solid rgb(226, 229, 241);

}
.cartProduct:last-child{
    border-bottom-color: transparent;

}
.info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width:40%;
    margin:0 5%
}
.sku{
    color:rgb(126, 133, 155);
    font-size:12px
}
.name{
    font-weight: bold;
    font-size: 13px;
}
i,.remove{
color:rgb(178, 187, 210);
font-size:12px;
display: inline-block;
}
i:hover,.remove:hover{
    cursor: pointer;
    opacity:0.8
}
.priceWrapper{
    display:flex;
    align-items: center;
}
.price{
    font-size:16px;
    font-weight:bold
}
.quantity{
    align-self: center;
    margin-left:auto;
    display: flex;
}
.quantity span{
    color:#555;
    font-size:12px;
    font-weight: bold;font-size: 20px;
    border:1px solid rgb(178, 187, 210);
    height: 35px;
    width:35px;
    text-align: center;
    cursor: pointer;
    line-height: 35px;

}
.quantity span:hover{
    opacity: 0.8;
}
.quantity span:first-child
{
    border-right-color: transparent;
        border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;

}
.quantity span:last-child
{
    border-left-color: transparent;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;

}
.quantity input{
    width:80px;
    border:1px solid rgb(178, 187, 210);
    height:35px;
    outline: none;
    text-align: center;
   display: inline-block;
}
</style>