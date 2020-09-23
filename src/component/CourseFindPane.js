import React from "react";
import { Tab } from "semantic-ui-react";

import './css/CourseFindPane.css'
import BrowseForm from './BrowseForm';
import SearchForm from './SearchForm';

import courseApi from '../api/course-api';

const fetchAllDeptOptions = async () => {
    let response = []
    try {
        response = await courseApi.get('/course/dept/all');
    } catch (e) {
        console.log(e.toString());

        // return dummy data
        return [
            { label: 'COMPSCI', value: 'COMPSCI' },
            { label: 'IN4MATX', value: 'IN4MATX' },
        ]
    }

    return response.data.map((dept, i) => {
        return { label: dept, value: dept, };
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
                { label: 'Lower Division', value: 'Lower Division' },
                { label: 'Upper Division', value: 'Upper Division' },
                { label: 'Undergraduate', value: 'Undergraduate' },
                { label: 'Graduate', value: 'Graduate' },
                { label: 'Other', value: 'Other' },
            ],
            panes: [
                {
                    menuItem: 'Browse',
                    render: () => (
                        <Tab.Pane attached={false}>
                            <BrowseForm
                                onBrowseSubmit={this.props.onBrowseSubmit}
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
                            <SearchForm
                                onSearchSubmit={this.props.onSearchSubmit}
                                deptOptions={this.state.deptOptions}
                            />
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