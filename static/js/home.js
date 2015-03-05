/**
 * home.js - JS Logic for the index page
 * @author: Shawn Chowdhury (shawnrc@csh.rit.edu)
 *
 *
 */

/** @jsx React.DOM */

var CategoryList = React.createClass({

    handleCategoryDelete: function(category) {

        var categories = this.props.data;
        var index;

        for (index = 0; index < this.props.data.length; ++index) {
            if (categories[index].name == category.name) break;
        }

        categories.splice(++index, 1);

        this.setState({data: categories}, function() {

            $.ajax({
                url: this.props.delUrl,
                dataType: 'json',
                type: 'DELETE',
                data: category,

                success: function(data) {
                    this.setState({data: data});
                }.bind(this),

                error: function(xhr, status, err) {
                    console.error(this.props.delUrl, status, err.toString())
                }.bind(this)

            });

        });

    },

    render: function() {
        var categoryNodes = this.props.data.map(function(category, index) {
            return(
                <CategoryRow
                    name={category.catName}
                    key={index}
                    deleteHandler={this.handleCategoryDelete}
                />
            );
        }, this);  // because map introduces a new 'this' context, we must manually specify which
                   // 'this' to reference within the scope of the function call.

        return(
            <ul className="list-group categoryList">
                {categoryNodes}
            </ul>
        );
    }

});

var CategoryForm = React.createClass({

    handleSubmit: function(e) {
        e.preventDefault();

        var catName = this.refs.catName.getDOMNode().value.trim();

        if (!catName) return;

        this.props.onCategorySubmit({catName: catName});

        this.refs.catName.getDOMNode().value = '';

    },
    render: function() {
        return(
            <form className="categoryForm" onSubmit={this.handleSubmit}>
                <h4>Add a new category:</h4>
                <div className="form-group">
                    <label htmlFor="categoryName">New Category</label>
                    <input type="text" className="form-control" ref="catName" placeholder="Category Name" />
                </div>
                <button type="submit" className="btn btn-default" id="categorySubmit">Submit</button>
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

        this.setState({data: categories}, function() {

            $.ajax({
                url: this.props.addUrl,
                dataType: 'json',
                type: 'POST',
                data: category,

                success: function(data) {
                    this.setState({data: data});
                }.bind(this),

                error: function(xhr, status, err) {
                    console.error(this.props.addUrl, status, err.toString())
                }.bind(this)

            });

        });
    },

    getInitialState: function() {
        return {data:[]}
    },

    componentDidMount: function() {
        this.loadCategoriesFromServer();
        // this part actually sets the refresh interval for this component
        setInterval(this.loadCategoriesFromServer, this.props.pollInterval)
    },

    render: function() {

        if ($.isEmptyObject(this.state.data)) {

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
                <CategoryList data={this.state.data} delUrl="/del_cats" />
                <CategoryForm onCategorySubmit={this.handleCategorySubmit} />
            </div>
        );


    }

});


var CategoryRow = React.createClass({

    handleDelete: function(e) {
        e.preventDefault();

        this.props.deleteHandler({catName: this.props.name});

    },

    render: function() {
        return(
            <li className="list-group-item" ref="rowName" key={this.props.key}>
                {this.props.name}
                <button
                    className="btn btn-danger btn-xs glyphicon glyphicon-remove pull-right"
                    onClick={this.handleDelete}
                />
            </li>
        )
    }

});


$(document).ready(function() {

    React.render(
        <CategoryBox url="/get_cats" addUrl="/add_cats" pollInterval={2000} />,
        document.getElementById('categories')
    );

});
