var vm = new Vue({
    el: '#age',
    data :{
        age : 20
    },
})

function oneMore(){
    vm.age += 1
}
var intervalID = window.setInterval(oneMore,1000)