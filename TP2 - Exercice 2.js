var vm = new Vue({
    el : '#color',
    data :{
        isWhite: false,
    },
    methods : {
        inverser(){
            this.isWhite = !this.isWhite
        },
    },
    computed:{
        myText : function(){
            if (this.isWhite){
                return"Blanc";
            }else{
                return"Noir";
            }
        },
    },
})