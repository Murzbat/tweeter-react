import React, {Component} from 'react';
import idGenerator from 'react-id-generator';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import styled from 'styled-components';
const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px; `
const StyledAppBlock = styled(AppBlock)`
    background-color: white;`

export default class App extends Component{
    constructor(props){
        super(props);
        this.Id = idGenerator();
        this.state={
            
            data:[
                {label: 'Going to learn React', important: false, like: false, id: idGenerator()},
                {label: 'That is so good', important: true, like: false, id: idGenerator()},
                {label: 'I need a break...', important: false, like: false, id: idGenerator()}
                 ],
            term: '',
            filter: 'all'


        };
        this.state.data = this.state.data.filter((object) => {
            return (object instanceof Object) && (!Array.isArray(object))
        });
    
        
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImpoLike = this.onToggleImpoLike.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);


        //this.maxId = 4;
    }
    deleteItem(id){
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id);

            const newArr = [...data.slice(0,index), ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    }
    addItem(body) {
        const newItem = {

            label: body,
            important: false,
            id: this.Id

        }
        this.setState(({data}) =>{
        
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }
 
    onToggleImpoLike(id, e){
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];

            const newItem = {...old, [e]: !old[e]};
            const newArr = [...data.slice(0,index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
        
    }
    searchPost(items, term){
        if (term.lenght === 0) {
            return items
        }
        
        return items.filter((item) =>{
            return item.label.indexOf(term) > -1
        });
    }

    filterPost(items, filter){
        if (filter === 'like'){
            return items.filter(item => item.like)
        } else {
            return items
        }
    }
    onUpdateSearch(term){
        this.setState({term})
    }

    onFilterSelect(filter) {
        this.setState({filter}) 
    }
    
    render(){
        const {data, term, filter} = this.state;

        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePost = this.filterPost(this.searchPost(data, term), filter);
        const rightData = visiblePost.filter(type =>(typeof type ==='object') && (typeof type !== 'null')&&(type.constructor === Object));
        return(
            <AppBlock>
                <AppHeader 
                liked = {liked}
                allPosts = {allPosts}
                            />
                <div className="search-panel d-flex">
                    <SearchPanel 
                    onUpdateSearch = {this.onUpdateSearch}/>
                    <PostStatusFilter 
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                        />
                </div>
                <PostList 
                posts = {rightData}
                onDelete={ this.deleteItem}
                onToggleImpoLike={this.onToggleImpoLike}
                
                />
                <PostAddForm
                onAdd={this.addItem}/>
            </AppBlock>
            
            )
    }
 
}
