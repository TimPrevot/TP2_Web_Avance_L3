var vm = new Vue({
    el: '#age',
    data: {
        age: 21
    },
    methods:{
        oneMore : function(){
            this.age = this.age + 1
        }
    }
})

var intervalID = window.setInterval(vm.oneMore, 1000)