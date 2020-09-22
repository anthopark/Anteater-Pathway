import React from "react";
import { Tab } from "semantic-ui-react";

import './css/CourseFindPane.css'
import BrowseForm from './BrowseForm';
import SearchForm from './SearchForm';

import courseAxios from '../api/course-api';

const fetchAllDeptOptions = async () => {
    let response = []
    try {
        response = await courseAxios.get('/api/course/dept/all');
    } catch (e) {
        console.log(e.toString());

        // return dummy data
        return [
            { key: 0, text: 'COMPSCI', value: 'COMPSCI' },
            { key: 1, text: 'IN4MATX', value: 'IN4MATX' },
        ]
    }

    return response.data.map((dept, i) => {
        return { key: i, text: dept, value: dept, };
    });
}

export default class CourseFindPane extends React.Component {

    state = {
        panes: [],
        deptOptions: [],
        levelOptions: []
    }

    async componentDidMount() {
        // API calls to retrieve dropdown items for departments
        const result = await fetchAllDeptOptions();
        this.setState({
            deptOptions: result,
            levelOptions: [
                { key: 0, text: 'Lower Division', value: 'Lower Division' },
                { key: 1, text: 'Upper Division', value: 'Upper Division' },
                { key: 2, text: 'Undergraduate', value: 'Undergraduate' },
                { key: 3, text: 'Graduate', value: 'Graduate' },
                { key: 4, text: 'Other', value: 'Other' },
            ],
            panes: [
                {
                    menuItem: 'Browse',
                    render: () => (
                        <Tab.Pane attached={false}>
                            <BrowseForm
                                deptOptions={this.state.deptOptions}
                                levelOptions={this.state.levelOptions}
                            />
                        </Tab.Pane>
                    )
                },
                {
                    menuItem: 'Search',
                    render: () => (
                        <Tab.Pane attached={false}>
                            <SearchForm deptOptions={this.state.deptOptions} />
                        </Tab.Pane>
                    )
                },
            ]
        })
    }

    render() {
        return (
            <div className="course-find-pane">
                <Tab menu={{ secondary: true, pointing: true }} panes={this.state.panes} />
            </div>
        );
    }
}