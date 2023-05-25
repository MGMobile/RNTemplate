import {ToastMessageTypes} from '@app/redux/toast/toast.types';
import * as RootNavigation from '@app/services/navigation';
import theme from '@app/theme';
import {TOAST_DEFAULT_DURATION} from '@app/utils/constants';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Platform, View} from 'react-native';
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, {
  block,
  cond,
  EasingNode,
  eq,
  event,
  Extrapolate,
  set,
  timing,
  useValue,
} from 'react-native-reanimated';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import styled, {css} from 'styled-components/native';
import Text from '@app/components/ui/text/text';
import Icon from '../icon';

const SContainer = styled.View`
  position: absolute;
  top: ${({insets}) => `${(insets ? insets.top : 0) + 8}px`};
  left: ${({theme}) => theme.container.rg}px;
  right: ${({theme}) => theme.container.rg}px;
`;

const SToast = styled.View`
  background: ${({theme}) => theme.colors.primary};
  border-radius: 24px;
  padding: 20px 15px 20px 24px;
`;

const SContainerIcon = styled.View`
  background: ${({theme}) => theme.colors.white};
  height: 60px;
  width: 60px;
  border-radius: 60px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`;

const SIcon = styled(Text)`
  color: ${({theme}) => theme.colors.primary};
`;

const STitle = styled(Text)`
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => `${theme.font.sizes.md}px`};
  font-weight: 700;
  margin-bottom: 6px;
`;

const SMessage = styled(Text)`
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => `${theme.font.sizes.rg}px`};
`;

const SBold = styled(Text)`
  font-weight: 700;
`;

const baseAnimationConfig = {
  duration: 400,
  easing: EasingNode.out(EasingNode.cubic),
};

const Toast = ({title, message, hideToast, options = {}}) => {
  const {
    duration = TOAST_DEFAULT_DURATION,
    navigate,
    type,
    swipeable = true,
  } = options;

  const [maxY, setMaxY] = useState(0);
  const opacityAnimValue = useValue(0);
  let translateYAnimValue = useValue(-10);

  const closeTimeout = useRef();

  useEffect(() => {
    timing(opacityAnimValue, {
      ...baseAnimationConfig,
      toValue: 1,
    }).start(finished => {
      if (finished) {
        closeTimeout.current = setTimeout(() => {
          closeToast();
        }, duration);
      }
    });
    timing(translateYAnimValue, {
      ...baseAnimationConfig,
      toValue: 0,
    }).start();

    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
        closeTimeout.current = undefined;
      }
    };
  }, [closeToast, duration, opacityAnimValue, translateYAnimValue]);

  const closeToast = useCallback(() => {
    timing(opacityAnimValue, {
      ...baseAnimationConfig,
      toValue: 0,
    }).start(finished => {
      if (finished) {
        hideToast();
      }
    });
    timing(translateYAnimValue, {
      ...baseAnimationConfig,
      toValue: -10,
    }).start();
  }, [hideToast, opacityAnimValue, translateYAnimValue]);

  const renderIcon = useMemo(() => {
    if (type) {
      let icon, size, color;

      switch (type) {
        case ToastMessageTypes.ERROR:
          icon = <Icon name="cross" size={22} color={theme.colors.danger} />;
          break;

        default:
          icon = <Icon name="check" size={22} color={theme.colors.primary} />;
          break;
      }

      return <SIcon>{icon}</SIcon>;
    }

    return null;
  }, [type]);

  const handlePress = useCallback(() => {
    RootNavigation.navigate(navigate);
  }, [navigate]);

  const handleGestureEvent = event([
    {
      nativeEvent: ({translationY: y, state}) =>
        block([cond(eq(state, State.ACTIVE), [set(translateYAnimValue, y)])]),
    },
  ]);

  const handleGestureStateChange = e => {
    const {state} = e.nativeEvent;

    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = undefined;
    }

    if (state === State.END || state === State.CANCELLED) {
      timing(translateYAnimValue, {
        ...baseAnimationConfig,
        toValue: -maxY,
      }).start(finished => {
        if (finished) {
          hideToast();
        }
      });
    }
  };

  const onLayout = useCallback(e => {
    const {layout} = e.nativeEvent;
    setMaxY(layout.height + layout.y);
  }, []);

  const regex = /\*([^*]+)\*/g;
  const parts = message.split(regex);

  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => (
        <PanGestureHandler
          enabled={swipeable}
          minDist={1}
          onGestureEvent={handleGestureEvent}
          onHandlerStateChange={handleGestureStateChange}>
          <SContainer
            as={Animated.View}
            insets={insets}
            onLayout={onLayout}
            style={{
              opacity: opacityAnimValue,
              transform: [
                {
                  translateY: translateYAnimValue.interpolate({
                    inputRange: [-maxY, 0],
                    outputRange: [-maxY, 0],
                    extrapolate: Extrapolate.CLAMP,
                  }),
                },
              ],
            }}>
            <SToast>
              <TouchableWithoutFeedback
                onPress={navigate ? handlePress : undefined}>
                <View flex={1} flexDirection="row">
                  <SContainerIcon>{renderIcon}</SContainerIcon>
                  <View flex={1}>
                    <STitle>{title}</STitle>
                    <SMessage>
                      {parts.map((text, idx) =>
                        message.includes(`*${text}*`) ? (
                          <SBold key={idx}>{text}</SBold>
                        ) : (
                          text
                        ),
                      )}
                    </SMessage>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </SToast>
          </SContainer>
        </PanGestureHandler>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

export default Toast;
