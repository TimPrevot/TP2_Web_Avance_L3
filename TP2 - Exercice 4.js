var vm = new Vue({
    el:"#liste",
    data :{
        cours:['Algorithmique', 'Structures de données', 'Programmation Web', 'Web Avancé', 'Frond-end Web Development', 'Asynchronous Event-Driven Programming with Node.js'],
        cour:'',
        modif:'',
        selectedIndex: 0,
    },
    methods : {
        ajouter : function(cour){
            this.cours.push(cour)
        },
        recupIndex: function(event, selectedIndex) {
            console.log(event, selectedIndex);
            this.selectedIndex = selectedIndex;
        },
        modifier : function(modif,index){
            Vue.set(this.cours,index,modif)
        }
    }
})