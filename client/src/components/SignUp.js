import React, {Component} from 'react';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
       this.state={

       }
    }

    render() {
        return (
            <div>
                <h1>SignUp</h1>
                <form>
                    <p>
                        <label>UserName</label>
                        <input type="text"/>
                    </p>
                    <p>
                        <label>Password</label>
                        <input type="text"/>
                    </p>
                    <p>
                        <label></label>
                        <input type="text"/>
                    </p>
                </form>
            </div>
        );
    }
}
