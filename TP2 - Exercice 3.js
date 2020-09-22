var vm = new Vue({
    el:"#liste",
    data :{
        fruits:[
            {text:'Pomme'},
            {text:'Orange'},
            {text:'Fraise'},
            {text:'Melon'},
            {text:'Cerise'},
        ],
        CurrentFruit:'Pomme',
    },
    methods :{
        changeCurrentFruit : function(fruit){
            this.CurrentFruit = fruit
        },
        fruitGras : function(fruit){
            if (fruit == this.CurrentFruit){
                return true
            }else{
                return false
            }
        },
        removeFruit : function(index){
            this.fruits.splice(index, 1)
        }
    }
})