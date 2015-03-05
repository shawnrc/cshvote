/**
 * home.js - JS Logic for the index page
 * @author: Shawn Chowdhury (shawnrc@csh.rit.edu)
 *
 *
 */

/** @jsx React.DOM */

var CategoryList = React.createClass({

    render: function() {
        return
    }

});

var CategoryForm = React.createClass({


});


/**
 * Categories Box
 *
 */
var CategoryBox = React.createClass({

    loadCategoriesFromServer: function() {
        $.ajax({

            url: this.props.url,
            dataType: 'json',
            success: function(data) {

                this.setState({data: data});

            }.bind(this),

            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    },

    handleCategorySubmit: function(category) {
        var categories = this.state.data;
        categories.push(category);

        this.setState({data: categories}, function () {

            $.ajax({
                url: this.props.url,
                dataType: 'json',
                type: 'POST',
                data: category,

                success: function(data) {
                    this.setState({data: data});
                }.bind(this),

                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString())
                }.bind(this)

            });

        });
    },

    getInitialState: function() {
        return {data:[]}
    },

    componentDidMount: function() {
        this.loadCategoriesFromServer();
        setInterval(this.loadCategoriesFromServer, this.props.pollInterval)
    },

    render: function() {
        return(
            <div className="col-md-4 categoriesBox">
                <h4>Categories</h4>
                <CategoryList data={this.state.data} />
                <CategoryForm onCategorySubmit={this.handleCategorySubmit} />
            </div>
        );


    }

});



var CategoryRow = React.createClass({

    render: function() {
        return(
            <li>{this.props.name}</li>
        )
    }

});


$(document).ready(function() {

    React.render(
        <CategoryBox />,
        document.getElementById('categoriesBox')
    );

});
