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

    handleSubmit: function(e) {
        e.preventDefault();

        var catName = this.refs.catName.getDOMNode().value.trim();

        if (!catName) return;

        this.props.onCategorySubmit({categoryName: catName});

        this.refs.catName.getDOMNode().value = '';

    },
    render: function() {
        return(
            <form className="categoryForm" onSubmit={this.handleSubmit}>
                <h4>Add a new category:</h4>
                    <div class="form-group">
                        <label for="categoryName">New Category</label>
                        <input type="text" class="form-control" ref="catName" placeholder="Category Name" />
                    </div>
                    <button type="submit" class="btn btn-default" id="categorySubmit">Submit</button>
            </form>
        );
    }


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

        if ($(this.state.data).isEmptyObject()) {

            return(
                <div className="col-md-4 categoriesBox">
                    <h4>Categories</h4>
                    <p><strong>Oh no!</strong> There aren't any categories yet!</p>
                    <CategoryForm onCategorySubmit={this.handleCategorySubmit} />
                </div>
            );

        }

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
        <CategoryBox url="/get_cats" pollInterval={2000} />,
        document.getElementById('categories')
    );

});
