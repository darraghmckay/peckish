import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import appStyle from '../styles/app';
import HomeStyles from '../styles/home';
const {
  ScrollView,
  View,
  TextInput,
  Image,
  Text,
  TouchableHighlight
} = ReactNative;

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      ingredientsInput: ''
    };
  }

  searchPressed() {
    this.setState({
      searching: true
    });

    this.props.fetchRecipes(this.state.ingredientsInput).then( (res) => {
      this.setState({
        searching: false
      })
    });
  }

  onChangeSearch(ingredientsInput) {
    this.setState({
      ingredientsInput
    });
  }

  recipes() {
    const { searchedRecipes } = this.props;
    return Object.keys(searchedRecipes).map(key => searchedRecipes[key]);
  }

  renderRecipes(recipes, searching) {
    if (searching) {
      return (
        <Text>Searching...</Text>
      );
    }

    return recipes.map((recipe) => {
      return <TouchableHighlight key={recipe.id}  style={HomeStyles.searchButton} onPress={() => this.props.navigate({ key: 'Detail', id: recipe.id})}>
        <View>
          <Image source={{uri: recipe.thumbnail}} style={appStyle.resultImage} />
          <Text style={appStyle.resultText} >{recipe.title}</Text>
        </View>
      </TouchableHighlight>
    });
  }

  render() {
    const recipes = this.recipes();
    const { ingredientsInput, searching } = this.state;

    return (
      <View style={HomeStyles.scene}>
        <View style={HomeStyles.searchSection}>
          <TextInput style={HomeStyles.searchInput}
            returnKeyType="search"
            placeholder="Ingredients (comma delimited)"
            onChangeText={(ingredientsInput) => { this.onChangeSearch(ingredientsInput) }}
            value={ingredientsInput}
          />
          <TouchableHighlight style={HomeStyles.searchButton} onPress={() => this.searchPressed()}>
            <Text>Fetch Recipes</Text>
          </TouchableHighlight>
        </View>
        <ScrollView style={HomeStyles.scrollSection} >
          {this.renderRecipes(recipes, searching)}
        </ScrollView>
      </View>
    );
  }
}

Home.propTypes = {
  fetchRecipes: PropTypes.func.isRequired,
  searchedRecipes: PropTypes.object.isRequired,
};

function mapStateToProps({ searchedRecipes }) {
  return {
    searchedRecipes
  };
}

export default connect(mapStateToProps)(Home);
