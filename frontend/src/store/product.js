import {create} from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    getProducts: async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            const res = await fetch("/api/products", {
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!res.ok) {
                throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            set({ products: data.data });
            return { success: true, data: data.data };
        } catch (error) {
            console.error("Error fetching products:", error);
            if (error.name === 'AbortError') {
                return { success: false, message: "Request timed out. Please try again." };
            }
            return { success: false, message: error.message };
        }
    },
    
    fetchProducts: async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            const res = await fetch("/api/products", {
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!res.ok) {
                throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            set({ products: data.data });
            return { success: true, data: data.data };
        } catch (error) {
            console.error("Error fetching products:", error);
            if (error.name === 'AbortError') {
                return { success: false, message: "Request timed out. Please try again." };
            }
            return { success: false, message: error.message };
        }
    },

    deleteProduct: async(pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data= await res.json();
        if(!data.success) return { success: false, message: data.message};

        set(state => ({products : state.products.filter(product => product._id !== pid)}));
        return {success : true , message: data.message}

    },

    updateProduct: async(pid, updatedProduct) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct)
            });
            const data = await res.json();
            if(!data.success) return { success: false, message: data.message };
// updates ui immediately w/o needing to refresh
            set(state => ({
                products: state.products.map(product => 
                    product._id === pid ? data.data : product
                )
            }));
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    createProduct: async (newProduct) =>{
        if( !newProduct.name || !newProduct.price || !newProduct.image  ){
            return {success : false, message: "Please fill in all fields . "};
        }
        const res= await fetch("/api/products",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newProduct),
        });
        
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: "Server error" }));
            return { success: false, message: errorData.message || "Failed to create product" };
        }
        
        const data = await res.json();
        set((state )=> ({products: [...state.products , data.data] }));
        return { success : true, message: "Product Created Successfully "};

    },

    

}));
