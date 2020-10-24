const initialData = {
    tasks: {
        'task-1': { id: "123", content: "abc"},
        'task-2': { id: "234", content: "bcd"},
        'task-3': { id: "345", content: "cde"},
        'task-4': { id: "456", content: "def"},
    },

    colunms: {
        'column-1': {
            id: 'column-1', 
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
    },

    columnOrder: ['column-1'],
}