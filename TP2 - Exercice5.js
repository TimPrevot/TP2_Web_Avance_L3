var vm = new Vue({
    el:"#liste",
    data :{
        defaultTaskTitle: "",
        contenu: "",
        tasks: []
    },
    methods : {
        addTask(parent) {
            this.tasks.push({
                title: this.defaultTaskTitle,
                contenu: this.contenu,
                done: false,
                defaultSubtaskTitle: "",
            });
            this.defaultTaskTitle = "";
            this.contenu = "";
        },
        modifier : function(modif,index){
            Vue.set(this.cours,index,modif)
        },
        deleteTask : function(index){
            this.tasks.splice(index, 1)
        },
    }
})
