import axios from "axios"

const apiClient = {
    
    async getListaUsuarios(){
        const response = await axios.get("/Usuario/ListaUsuario")
        return response.data;
    },
    
    async altaUsuario(requestData){
        const response = await axios.post("/Usuario", requestData);
    return response.data;
    },
    
    async modUsuario(requestData){
        const response = await axios.put("/Usuario", requestData);
    return response.data;
    },
    
    async deleteUsuario(id){
        const response = await axios.delete("/Usuario", id);
    return response.data;
    }

}
export default apiClient;