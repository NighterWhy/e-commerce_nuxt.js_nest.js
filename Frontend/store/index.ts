import { defineStore } from "pinia";
import { State } from '@/components/types'



export const useMainStore = defineStore("main", {
  state: (): State => ({
    user: {
      id: '',
      name: '',
      email: ''
    },
    productInfo: {},
    cartItems: [],
    items: [],
  }),


  getters: {

    itemsNumber: ({ cartItems }) => {
      return cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
    },

    totalPrice: ({ cartItems }) => {
      return cartItems.reduce((total: number, item: any) => {
        return total + (item.price * item.quantity);
      }, 0);
    },

  },
  actions: {

    async fetchItems() {
      try {
        const response = await fetch(`http://localhost:3000/products`)
        const data = await response.json()


        this.items = data.map((p: any) => ({
          id: p._id,

          img: `http://localhost:3000/uploads/${p.photo}`,
          title: p.name,
          seller: p.seller,
          price: p.price,
          type: p.category,
          stock: p.stock,
          color: "default"
        }))
      } catch (error) {
        console.error('Ürünleri çekerken hata:', error)
      }
    },

    async fetchSingleProduct(id: string) {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`)
        const data = await res.json()
        this.productInfo = {
          id: data._id,
          img: `http://localhost:3000/uploads/${data.photo}`,
          title: data.name,
          price: data.price,
          stock: data.stock,
          type: data.category,
          description: data.description,
          color: "default"
        }
      } catch (err) {
        console.error('Ürün detayı çekilemedi:', err)
      }
    },


    // Cart Component
    async inCart(product: any) {
      console.log('🛒 inCart’e gelen product:', product);
      

      const pid = product.productId ?? product.id;
      if (!pid) {
        console.error('Ürün ID’si bulunamadı:', product);
        return;
      }

      try {
        if (!this.user.id) {
          console.warn('Kullanıcı ID boş, sepet verisi çekilmeyecek');
          return;
        }

        const res = await fetch(`http://localhost:3000/cart/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: this.user.id,
            quantity: 1,
            product: {
              productId: pid, // <-- id'yi productId olarak gönder!
              title: product.title,
              price: product.price,
              img: product.img
            }
          })
        });
        const data = await res.json();
        if (res.ok) {
          await this.fetchCartItems();
        } else {
          alert(data.message || 'Sepete eklenemedi ❌');
        }
      } catch (error) {
        console.error('Sepete eklenirken hata:', error);
      }
    },
    async clearCart() {
      try {
       
        const res = await fetch(
          `http://localhost:3000/cart/clear/${this.user.id}`,
          { method: 'DELETE' }
        );
        if (res.ok) {
          // store’da de sıfırla
          this.cartItems = [];
        } else {
          console.warn('Sepet temizlenemedi:', await res.text());
        }
      } catch (error) {
        console.error('Sepet temizlenirken hata:', error);
      }
    },

    initUser() {
      const id = localStorage.getItem('token') || '';
      const name = localStorage.getItem('userName') || '';
      const email = localStorage.getItem('email') || '';
      if (!id) {
        this.user = { id: '', name: '', email: '' }
      } else {
        this.user = { id, name, email }
      }
    },


    async fetchCartItems() {
      try {
        
        const res = await fetch(`http://localhost:3000/cart/${this.user.id}`);
        const data = await res.json();
        this.cartItems = data.map((item: any) => ({
          productId: item.productId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          img: item.img || '',
        }));
      } catch (err) {
        console.error('Sepet verileri alınamadı:', err);
      }
    },
    async checkout() {
      try {
        
        const res = await fetch(`http://localhost:3000/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: this.user.id })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Checkout başarısız');
        this.cartItems = [];
        alert(data.message);
      } catch (err: any) {
        console.error('Checkout hatası:', err);
        alert(err.message);
      }
    },


    async outCart(productId: string | number) {
      try {
        
        const res = await fetch(`http://localhost:3000/cart/remove`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: this.user.id,
            productId: productId
          })
        });
        const data = await res.json();
        if (res.ok) {
          await this.fetchCartItems(); // Sepeti güncelle!
        } else {
          alert(data.message || 'Sepetten çıkarılamadı ❌');
        }
      } catch (error) {
        console.error('Sepetten çıkarırken hata:', error);
      }
    },
    // Info Component
    addtoInfo(n: number) {
      const selectedProduct = this.items.find((item) => item.id === n);
      this.productInfo = selectedProduct!;
    },
  },
});
