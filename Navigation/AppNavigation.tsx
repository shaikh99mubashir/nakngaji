import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useContext, useEffect } from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Splash from '../Screens/Splash';
import Home from '../Screens/Home';
import { Theme } from '../constant/theme';
import JobTicket from '../Screens/JobTicket';
import Schedule from '../Screens/Schedule';
import Inbox from '../Screens/Inbox';
import More from '../Screens/More';
import Login from '../Screens/Login/Login';
import OnBoarding from '../Screens/OnBoarding';
import Verification from '../Screens/Verification';
import Signup from '../Screens/Signup';
import Filter from '../Screens/Filter';
import OpenDetails from '../Screens/OpenDetails';
import AppliedDetails from '../Screens/AppliedDetails';
import InboxDetail from '../Screens/InboxDetailScreen';
import FAQs from '../Screens/FAQs';
import BackToDashboard from '../Screens/BackToDashboardScreen';
import AttendedClassRecords from '../Screens/AttendedClassRecords';
import Profile from '../Screens/Profile';
import Notifications from '../Screens/Notifications';
import Students from '../Screens/Students';
import PaymentHistory from '../Screens/PaymentHistory';
import ReportSubmission from '../Screens/ReportSubmission';
import ReportSubmissionHistory from '../Screens/ReportSubmissionHistory';
import AddClass from '../Screens/AddClass';
import EditPostpondClass from '../Screens/EditPostpondClass';
import EditCancelledClass from '../Screens/EditCancelledClass';
import ClockIn from '../Screens/ClockInScreen/ClockIn';
import ClockOut from '../Screens/ClockOutScreen';
import ClassTimerCount from '../Screens/ClassTimerCountScreen';
import ScheduleSuccessfully from '../Screens/ScheduleSuccessfully';
import Toast from 'react-native-toast-message';
import HomeIcon from '../SVGs/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base_Uri } from '../constant/BaseUri';
import axios from 'axios';
import TutorDetailsContext from '../context/tutorDetailsContext';
import PdfViewer from '../Screens/PdfViwer';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNavigation({navigation,route}: any) {
  const tutorDetailsCont = useContext(TutorDetailsContext);
  const {tutorDetails, setTutorDetail}: any = tutorDetailsCont;

  const getTutorData = async () => {
    let authData = await AsyncStorage.getItem('loginAuth');

    if (authData) {
      let tutorData: any = JSON.parse(authData);
      axios
        .get(`${Base_Uri}getTutorDetailByID/${tutorData?.tutorID}`)
        .then(res => {
          if(res.data.tutorDetailById == null){
            AsyncStorage.removeItem('loginAuth');
            navigation.replace('Login');
            setTutorDetail('')
            Toast.show({
              type: 'info',
              text1: 'Terminated',
              position: 'bottom'
            });
            return;
          }
          let tutorData = res.data;
          if (tutorData) {
            let allData = tutorData?.tutorDetailById[0];
            
            setTutorDetail(allData);
          }
          return;
        });
    }
  };

  useEffect(() => {
    getTutorData();
  }, []);
  
  const initialRoute =
    tutorDetails?.status?.toLowerCase() == 'unverified' ? 'JobTicket' : 'Home';

  const hideTabs =
    tutorDetails?.status?.toLowerCase() == 'unverified' ? ['Schedule', 'Home', 'inbox'] : [];

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: 'black',
        tabBarHideOnKeyboard:true
      })}>
      <>
        <Tab.Screen
          name="Job Ticket"
          component={JobTicket}
          options={{
            tabBarIcon: ({focused, color}) => (
              <View>
                {focused == true ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: 5,
                      borderRadius: 5,
                    }}>
                    <Image
                      source={require('../Assets/Images/Job.png')}
                      resizeMode="contain"
                      style={{
                        height: 50,
                        width: 50,
                        tintColor: focused ? 'black' : 'grey',
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={require('../Assets/Images/Job.png')}
                      resizeMode="contain"
                      style={{
                        height: 50,
                        width: 50,
                        tintColor: focused ? 'black' : 'grey',
                      }}
                    />
                  </View>
                )}
              </View>
            ),
          }}
        />
        {hideTabs?.includes('Schedule') ||
        tutorDetails?.status?.toLowerCase() != 'verified' && tutorDetails?.open_dashboard != 'yes' ? null : (
          <Tab.Screen
            name="Schedule"
            component={Schedule}
            options={{
              tabBarIcon: ({focused, color}) => (
                <View>
                  {focused == true ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        padding: 5,
                        borderRadius: 5,
                      }}>
                      <Image
                        source={require('../Assets/Images/schedule1.png')}
                        resizeMode="contain"
                        style={{
                          height: 50,
                          width: 50,
                          tintColor: focused ? 'black' : 'grey',
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={require('../Assets/Images/schedule1.png')}
                        resizeMode="contain"
                        style={{
                          height: 50,
                          width: 50,
                          tintColor: focused ? 'black' : 'grey',
                        }}
                      />
                    </View>
                  )}
                </View>
              ),
            }}
          />
        )}
        {hideTabs?.includes('Home') ||
        tutorDetails?.status?.toLowerCase() != 'verified' && tutorDetails?.open_dashboard != 'yes' ? null : (
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({focused, color}) => (
                <View>
                  {focused == true ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <HomeIcon/>
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <HomeIcon/>
                    </View>
                  )}
                </View>
              ),
            }}
          />
        )}
        {hideTabs?.includes('inbox') ||
        tutorDetails?.status?.toLowerCase() != 'verified' && tutorDetails?.open_dashboard != 'yes' ? null : (
          <Tab.Screen
            name="inbox"
            component={Inbox}
            options={{
              tabBarIcon: ({focused, color}) => (
                <View>
                  {focused == true ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        padding: 5,
                        borderRadius: 5,
                      }}>
                      <Image
                        source={require('../Assets/Images/Group203.png')}
                        resizeMode="contain"
                        style={{
                          height: 35,
                          width: 35,
                          tintColor: focused ? 'black' : 'grey',
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={require('../Assets/Images/Group203.png')}
                        resizeMode="contain"
                        style={{
                          height: 35,
                          width: 35,
                          tintColor: focused ? 'black' : 'grey',
                        }}
                      />
                    </View>
                  )}
                </View>
              ),
            }}
          />
        )}
        <Tab.Screen
          name="More"
          component={More}
          options={{
            tabBarIcon: ({focused, color}) => (
              <View>
                {focused == true ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: 5,
                      borderRadius: 5,
                    }}>
                    <Image
                      source={require('../Assets/Images/Group202.png')}
                      resizeMode="contain"
                      style={{
                        height: 35,
                        width: 35,
                        tintColor: focused ? 'black' : 'grey',
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={require('../Assets/Images/Group202.png')}
                      resizeMode="contain"
                      style={{
                        height: 35,
                        width: 35,
                        tintColor: focused ? 'black' : 'grey',
                      }}
                    />
                  </View>
                )}
              </View>
            ),
          }}
        />
      </>
    </Tab.Navigator>

  );
}
import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
const AppNavigation = () => {
  const navigateRef :any = React.createRef();
  const [navigateTo, setNavigateTo] = React.useState<any>('')
  function registerListenerWithFCM() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('onMessage Received : ', JSON.stringify(remoteMessage));
    if (
      remoteMessage?.notification?.title &&
      remoteMessage?.notification?.body
    ) {
      onDisplayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
        remoteMessage?.data,
      );
    }
  });
  notifee.onForegroundEvent(({type, detail}) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        // console.log('User pressed notification', detail.notification?.data);
        // if (detail?.notification?.data?.clickAction) {
        //   onNotificationClickActionHandling(
        //     detail.notification.data.clickAction
        //   );
        // }
        console.log('set to',detail.notification?.data);
        setNavigateTo(detail?.notification?.data)
        // if (detail.notification?.data?.screen === "jobTicket") {
        //   // navigation.navigate('Filter');
        //   // navigation.navigate('Main', { screen: 'jobTicket' });

        // }
        break;
    }
  });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'onNotificationOpenedApp Received',
      JSON.stringify(remoteMessage),
    );
    // if (remoteMessage?.data?.clickAction) {
    //   onNotificationClickActionHandling(remoteMessage.data.clickAction);
    // }
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  return unsubscribe;
}

// useEffect(()=>{
//   // registerListenerWithFCM()
//   const unsubscribe = registerListenerWithFCM();
//   return unsubscribe;
// },[])

async function onDisplayNotification(title:any, body:any, data:any) {
  console.log('onDisplayNotification Adnan: ', JSON.stringify(data));

  // Request permissions (required for iOS)
  await notifee.requestPermission();
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    data: data,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

  return (

    <NavigationContainer ref={navigateRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Main" component={BottomNavigation} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Filter" component={Filter} />
        <Stack.Screen name="OpenDetails" component={OpenDetails} />
        <Stack.Screen name="AppliedDetails" component={AppliedDetails} />
        <Stack.Screen name="InboxDetail" component={InboxDetail} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="BackToDashboard" component={BackToDashboard} />
        <Stack.Screen name="AttendedClassRecords" component={AttendedClassRecords} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Students" component={Students} />
        <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
        <Stack.Screen name="ReportSubmission" component={ReportSubmission} />
        <Stack.Screen name="AddClass" component={AddClass} />
        <Stack.Screen name="EditPostpondClass" component={EditPostpondClass} />
        <Stack.Screen name="EditCancelledClass" component={EditCancelledClass} />
        <Stack.Screen name="ClockIn" component={ClockIn} />
        <Stack.Screen name="ClockOut" component={ClockOut} />
        <Stack.Screen name="ClassTimerCount" component={ClassTimerCount} />
        <Stack.Screen name="ReportSubmissionHistory" component={ReportSubmissionHistory} />
        <Stack.Screen name="ScheduleSuccessfully" component={ScheduleSuccessfully} />
        <Stack.Screen name="PdfViewer" component={PdfViewer} />
      </Stack.Navigator>
      
        <Toast/>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
    customFont: {
        fontFamily: 'Circular Std Black',
        
      },
    
      tabBarStyle: {
        borderTopWidth: 0,
        height: 80,
        backgroundColor: Theme.white,
        
      },
});
