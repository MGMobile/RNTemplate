import * as React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '@app/theme';

const isIos = Platform.OS === 'ios';

const styles = StyleSheet.create({
  scrollInnerContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
});

function ScreenWithoutScrolling({
  behavior = isIos ? 'padding' : 'height',
  enableKeyboardAvoidingView = true,
  statusBarVisible = true,
  image = require('@app/assets/images/backgrounds/bg-football.png'),
  ...props
}) {
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {backgroundColor: theme.colors.haiti};
  const Wrapper = props.unsafe ? View : SafeAreaView;
  const headerHeight = useHeaderHeight();

  const SFixedInnerContainer = styled.View`
    flex: 1;
    flex-grow: 1;
    justify-content: flex-start;
    align-items: stretch;
    height: 100%;
    width: 100%;
  `;

  return (
    <KeyboardAvoidingView
      style={[styles.keyboardAvoidingViewStyle, backgroundStyle]}
      enabled={enableKeyboardAvoidingView}
      behavior={behavior}
      keyboardVerticalOffset={
        props.keyboardOffset === undefined ? headerHeight : props.keyboardOffset
      }>
      <StatusBar
        animated
        backgroundColor="transparent"
        translucent
        hidden={Platform.OS === 'android' ? false : !statusBarVisible}
        barStyle={props.statusBar ? props.statusBar : 'light-content'}
      />
      <ImageBackground
        resizeMode="cover"
        style={{
          flexGrow: 1,
          paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
        }}
        source={image}>
        <SFixedInnerContainer
          as={Wrapper}
          forceInset={props.forceInset}
          style={[style]}>
          {props.children}
        </SFixedInnerContainer>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling({
  behavior = isIos ? 'padding' : 'height',
  keyboardShouldPersistTaps = 'handled',
  enableKeyboardAvoidingView = true,
  statusBarVisible = true,
  onScroll,
  image = require('@app/assets/images/backgrounds/bg-football.png'),
  ...props
}) {
  const style = props.style || {};
  const backgroundStyle =
    props.backgroundColor && !props.backgroundImage
      ? {backgroundColor: props.backgroundColor}
      : {backgroundColor: ''};
  const Wrapper = props.unsafe ? View : SafeAreaView;
  const headerHeight = useHeaderHeight();

  const SScrollContainer = styled.View`
    flex: 1;
    flex-grow: 1;
    height: 100%;
  `;
  return (
    <KeyboardAvoidingView
      style={[styles.keyboardAvoidingViewStyle, backgroundStyle]}
      behavior={behavior}
      enabled={enableKeyboardAvoidingView}
      keyboardVerticalOffset={
        props.keyboardOffset === undefined ? headerHeight : props.keyboardOffset
      }>
      <StatusBar
        animated
        backgroundColor="transparent"
        translucent
        hidden={Platform.OS === 'android' ? false : !statusBarVisible}
        barStyle={props.statusBar ? props.statusBar : 'light-content'}
      />
      <ImageBackground
        style={{
          flexGrow: 1,
          paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
        }}
        source={image}>
        <SScrollContainer
          as={Wrapper}
          forceInset={{top: 'always'}}
          style={[style]}>
          <ScrollView
            onScroll={onScroll}
            scrollEventThrottle={16}
            contentContainerStyle={[styles.scrollInnerContainer, style]}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
            {props.children}
          </ScrollView>
        </SScrollContainer>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
const Screen = ({preset = 'scroll', onScroll, ...rest}) => {
  if (preset === 'fixed') {
    return (
      <ScreenWithoutScrolling forceInsert="top" preset={preset} {...rest} />
    );
  } else {
    return (
      <ScreenWithScrolling
        onScroll={onScroll}
        keyboardShouldPersistTaps="handled"
        forceInsert="top"
        contentInsetAdjustmentBehavior="automatic"
        preset={preset}
        {...rest}
      />
    );
  }
};

export default React.memo(Screen);
