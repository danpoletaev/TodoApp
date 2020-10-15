import React, { useEffect } from 'react'
import TodoListItem from './TodoListItem'
import NewTodoForm from "./NewTodoForm";
import {connect} from 'react-redux';
import { getTodosLoading, getCompletedTodos, getIncompleteTodos } from "./selectors";
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from "./thunks";
import styled from 'styled-components'

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`

const TodoList = ({completedTodos, incompletedTodos, onRemovePressed, onCompletePressed, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos()
    }, [])

    const loadingMessage = <div>Loading todos...</div>

    const content =  (
        <ListWrapper>
            <NewTodoForm/>
            <h3>Incomplete: </h3>
            {incompletedTodos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed}
                                             onCompletePressed={onCompletePressed}/>)}
                                             <h3>Completed:</h3>
            {completedTodos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed}
                                                        onCompletePressed={onCompletePressed}/>)}
        </ListWrapper>
    )

    return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ({
    completedTodos: getCompletedTodos(state),
    incompletedTodos: getIncompleteTodos(state),
    isLoading: getTodosLoading(state)

})

const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletePressed: id => dispatch(markTodoAsCompletedRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)