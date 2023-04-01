<template>
  <h1 class="h1">All Product</h1>
  <template v-if="loading"> Loading... </template>

  <template v-else>
    <main class="products">
      <section v-for="product in items" :key="product.id" class="products__container">
        <RouterLink :to="{ name: 'product', params: { id: product.title } }">
          <img :src="product.images[0]" :alt="product.title" class="products__image" />
          <div class="products__details">
            <h2 class="products__title">
              {{ product.title }}
            </h2>

            <p class="products__description">
              {{ product.description }}
            </p>

            <p class="products.discount">
              Save {{ product.discountPercentage }}%
            </p>

            <p class="products.stock">
              Total in Stock: {{ product.stock }}
            </p>

            <p class="products.price">
              Price: {{ product.price }}.-
            </p>
          </div>
        </RouterLink>

        <button @click="addToCart(product)">
          Add To Cart
        </button>
      </section>
    </main>
  </template>
  <!-- <h1>Shopping Product</h1>
  <div v-for="item in card" :key="item.id" className='card'>
    {{ item.image }} <br>
    {{ item.title }} <br>
    {{ item.category }} <br>
    {{ item.price }} <br>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      // api products in this array
      items: [],
      loading: true,
      error: "",
      sort: [],
    };
  },

  created() {
    // before vue creating want to fetch the api so it will be shown on the web page when loaded
    this.fetchStoreApi();
  },

  methods: {
    async fetchStoreApi() {
      const url = "https://dummyjson.com/products";
      const response = await fetch(url);
      try {
        await this.handleResponse(response);
      } catch (error) {
        this.error = error.message;
      }
    },

    async handleResponse(response) {
      if (response.status >= 200 && response.status < 300) {
        // fetch api data into json
        const { products } = await response.json();
        this.items = products;
        this.loading = false;
      } else {
        if (response.status === 404) {
          throw new Error("Fail Fetching with this URL!");
        }
        if (response.status === 401) {
          throw new Error("Not Authorized!");
        }
        if (response.status > 500) {
          throw new Error("Server not Found!");
        }
      }
    },

    addToCart(product) {
      this.$store.commit("addProductToCart", product);
    }
  },
};
// import axios from 'axios'

// export default {
//   name: 'App',
//   components: {
//   },
//   data() {
//     return {
//       card: []
//     }
//   },
//   async mounted() {
//     let result = await axios.get("https://fakestoreapi.com/products");
//     // console.warn(result.data)
//     this.card = result.data
//   }
// }
</script>

<style scoped>
.h1 {
  text-align: center;
}

.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 90vw;
  gap: 20px;
  margin: 30px;
}

.products__container {
  padding: 20px;
  border: 2px solid gainsboro;
  width: 100%;
  height: 100%;
}

.products__image {
  width: 100%;
  height: 350px;
}

.products__details {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.products__title {
  font-size: 20px;
  text-decoration: none;
  color: black;
}

@media screen and (min-width: 601px) and (max-width: 1200px) {
  .products {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100vw;
    gap: 20px;
  }
}

@media screen and (max-width: 600px) {
  .products {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100vw;
    gap: 20px;
  }
}

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 30px 0;
}

.card-description {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
} */
</style>
