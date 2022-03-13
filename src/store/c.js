// function: {
//     image: { url: ""}
// },
// mounted(){
//     this.loadNextImage();
// } ,
// methods:{
//     async loadNextImage()
//     {
//         try{
//             axios.defaults.headers.common['x-api-key'] = "ecbe9b73-ccde-420b-98b5-17935366cf7c" // Replace this with your API Key

//             let response = await axios.get('https://api.thedogapi.com/v1/breeds' ) // Ask for 1 Image, at full resolution
            
//             this.image = response.data[10].image // the response is an Array, so just use the first item as the Image
//             console.log(response.data[10].image.url)

//         }catch(err){
//             console.log(err)
//         }
//     }
// }