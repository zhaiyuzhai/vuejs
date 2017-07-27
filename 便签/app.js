// 存取localstorage的数据
var store={
    save:function (key,value) {
        localStorage.setItem(key,"");
        localStorage.setItem(key,JSON.stringify(value));
    },
    fetch:function (key) {
        return JSON.parse(localStorage.getItem(key))||[];
    }
}
var list=store.fetch("index");
console.dir(typeof list);
var vm=new Vue({
    el:".main",
    data:{
        list:list,
        inputValue:"",
        stored:[],
        visibility:"all",
        first:true,
        second:false,
        third:false
    },
    watch:{
        list:{
            handler:function () {
                // alert("watch");
                store.save("index",this.list)
            },
            deep:true
        }
    },
    computed:{
        noChecked:function () {
          return this.list.filter(function(item){
            return !item.checked
              }).length
        },
        filter:function () {
            if(this.visibility=='all'){return this.list}
            else if(this.visibility=="notChecked"){
                return this.list.filter(function (item) {
                    return !item.checked
                })
            }
            else{
                return this.list.filter(function (item) {
                    return item.checked
                })
            }
        }
    },
    methods:{
        click1:function () {
            this.first=true;
            this.second=false;
            this.third=false
        },
        click2:function () {
            this.first=false;
            this.second=true;
            this.third=false
        },
        click3:function () {
            this.first=false;
            this.second=false;
            this.third=true
        },
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
        },
        // addClass:function (e) {
        //     alert(1);
        //     console.log(e);
        // }
    },
    directives:{
        "focus":{
            update:function (el,bindings) {
                el.focus();
            }
        }
    }
});
function watchhashchange() {
    // alert(2);
    var hash=window.location.hash.slice(1);
    vm.visibility=hash;
}
window.addEventListener("hashchange",watchhashchange);