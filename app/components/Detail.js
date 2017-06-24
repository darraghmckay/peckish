import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import appStyle from '../styles/app';
import {
  View,
  Image,
  TouchableHighlight,
  Text
} from 'react-native'

class Detail extends Component {

  recipe() {
    return this.props.searchedRecipes[this.props.navigationParams.id] || null;
  }

  render() {
    const recipe = this.recipe();
    if (!recipe) { return null }

    return <View>
      <TouchableHighlight style={ { flex: 1, paddingVertical: 20, backgroundColor: '#222' } } onPress={ () => { this.props.navigateBack() } }>
        <Text style={{ color: '#FFF' } }>Go Back</Text>
      </TouchableHighlight>
      <View>
        <Image source={ { uri: recipe.thumbnail } } style={appStyle.resultImage} />
        <Text style={ appStyle.resultText } >{recipe.title}</Text>
        <Text style={ { fontSize: 21 } } >{recipe.ingredients}</Text>
      </View>
    </View>
  }
}


function mapStateToProps({ searchedRecipes, navigationParams }) {
  return {
    searchedRecipes,
    navigationParams
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
