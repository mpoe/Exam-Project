import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Image,
	ScrollView,
	Modal,
	Text,
	TouchableOpacity,
	Share,
} from 'react-native';

import { connect } from 'react-redux';

import LevelSelector from '../components/common/LevelSelector';


import {getTopscores} from '../api/'

class LevelSelectionWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topScores:[],
			modalVisible: false,
		}
	}

	goToLevel = (/*levelint */) => {
		this.props.navigation.navigate('Game');
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	getTopscores = (payload) => {
		getTopscores(payload)
			.then((response) => response.json())
			.then((responseJSON) => {
				console.log(responseJSON);
				if (responseJSON.status == 200) {
					this.setState({
						topScores: responseJSON.results
					})
					console.log(this.state);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<View>
				<ScrollView
					ref={ref => this.scrollView = ref}
					onContentSizeChange={(contentWidth, contentHeight) => {
						this.scrollView.scrollToEnd({ animated: true });
					}}
				>
					<Image
						style={{
							flex: 1,
							resizeMode: 'cover',
							maxWidth: '100%',
							justifyContent: 'flex-start',
						}}
						source={require('../Media/morten-bg.png')}
					/>
					<View style={{ marginTop: 22 }}>
						<Modal
							animationType="slide"
							transparent={false}
							visible={this.state.modalVisible}
							onRequestClose={() => {
								alert('Modal has been closed.');
							}}>
							<View style={{ marginTop: 22 }}>
								<View>
									<Text>Hello World!</Text>
									<ScrollView
										style={{ height: 200 }}
									>
										{this.state.topScores.map((result, index) => {
											return <Text key={index}>{result.score}</Text>
										})}
									</ScrollView>
									<TouchableOpacity
										onPress={() => Share.share({
											message: 'BAM: we\'re helping your business with awesome React Native apps',
											url: 'mpoe.dk',
											title: 'Wow, did you see that?'
										  }, {
											// Android only:
											dialogTitle: 'Share BAM goodness',
										  })
										}
									>
										<Text>Share on facebook!</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											this.setModalVisible(!this.state.modalVisible);
										}}>
										<Text>Hide Modal</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>

						<TouchableOpacity
							onPress={() => {
								this.setModalVisible(true);
								this.getTopscores({ levelID: 1 });
							}}>
							<Text>Show Modal</Text>
						</TouchableOpacity>
					</View>
					<LevelSelector levelID={3} gotoLevel={this.goToLevel} top={120} left={'43%'} />
					<LevelSelector levelID={2} gotoLevel={this.goToLevel} top={375} left={100} />
					<LevelSelector levelID={1} gotoLevel={this.goToLevel} top={550} left={100} />
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		name: state.user.name
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		//updateUserInfo: (payload) => dispatch(updateUserInfo(payload))
	};
}

const LevelSelection = connect(mapStateToProps, mapDispatchToProps)(
	LevelSelectionWrapper
);

export default LevelSelection;

