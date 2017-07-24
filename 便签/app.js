var list=[
    // {title:"吃饭打豆豆"},
    // {title:"吃饭打豆豆"}
];
new Vue({
    el:".main",
    data:{
        list:list,
        inputValue:"",
        stored:[]
    },
    methods:{
        addTodo:function (e) {
            list.push(
                {title:this.inputValue,
                checked:false,
                editable:true,
                lieditable:false
                }
            );
            this.stored.push(this.inputValue);
            this.inputValue=""
        },
        deleteTodo:function(index){
            this.list.splice(index,1);
        },
        edTodo:function(index){
            this.list[index].editable=false;
            this.list[index].lieditable=true;
        },
        edTodoend:function(index){
            this.list[index].editable=true;
            this.list[index].lieditable=false;
        },
        cancel:function(index){
            // alert(1);
            this.list[index].title=this.stored[index];
        }
    },
    directives:{
        "focus":{
            update:function (el,bindings) {
                // alert(1);
                el.focus();
            }
        }
    }
})