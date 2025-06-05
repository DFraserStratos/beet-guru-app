# React Native (Expo) Refactoring Plan for Beet Guru

## 1. Current App Technology Stack

### Frontend Technologies
- **React 18.2.0** - UI library for building user interfaces
- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **Lucide React 0.294.0** - Icon library (feather-style icons)
- **No routing library** - Uses conditional rendering for navigation
- **No state management library** - React hooks only (useState, useEffect, useReducer)
- **LocalStorage** - Client-side data persistence

### Build & Development Tools
- **Create React App** - Build tooling and configuration
- **PostCSS 8.4.27** - CSS processing
- **Autoprefixer 10.4.14** - Vendor prefixes
- **ESLint** - Code linting
- **Jest** - Testing framework (structure exists, tests not implemented)

### Application Architecture
- **Component-based architecture** with proper separation of concerns
- **Centralized state management** in App.js
- **Mock API service layer** with comprehensive fake data
- **Custom hooks** for reusable logic (useForm, useApi, useDeviceDetection, useLocalStorage)
- **Mobile-first responsive design** already implemented
- **Error boundaries** for graceful error handling
- **Multi-step wizard pattern** for assessments

### Key Application Features
- **Authentication system** using 4-digit verification codes
- **Multi-step assessment wizard** (4 steps: Crop Details, Field Setup, Measurements, Review)
- **Report generation and viewing** with filtering/sorting
- **Location/paddock management** with CRUD operations
- **User role management** (farmers, retailers, admins)
- **Settings and profile management** with tabbed interface
- **Draft assessment support** with persistence
- **Weather widget** and seasonal timeline
- **Cultivar information** reference

## 2. Context for React to React Native (Expo) Refactor

### Why This Refactor Makes Sense

1. **Target Users**: Farmers primarily use mobile devices in the field
2. **Mobile-First Design**: The app is already designed and optimized for mobile screens
3. **Offline Requirements**: Farmers often work in areas with poor connectivity
4. **Native Features Needed**: GPS for paddock location, camera for crop photos, push notifications for reminders
5. **Component Architecture**: Current structure maps well to React Native patterns
6. **No Complex Web Dependencies**: No WebGL, complex animations, or browser-specific features

### Benefits of Using Expo

1. **Rapid Development**: Expo's managed workflow accelerates development
2. **Built-in APIs**: Camera, GPS, notifications, biometric auth included
3. **Over-the-Air Updates**: Deploy updates without app store approval
4. **Development Builds**: Can add native modules when needed
5. **EAS Services**: Cloud builds, submissions, and updates
6. **Cross-Platform**: Single codebase for iOS and Android

### Challenges to Address

1. **Navigation Pattern Change**: From conditional rendering to React Navigation
2. **Styling System**: From Tailwind CSS to NativeWind or StyleSheet
3. **Form Handling**: No native form elements in React Native
4. **Storage**: LocalStorage to AsyncStorage/SecureStore migration
5. **Web-Specific APIs**: Window object, DOM manipulation don't exist

## 3. Key Learnings from React to React Native Migration Research

### Component Mapping Strategy

```javascript
// HTML to React Native Component Mapping
<div> → <View>
<span> → <Text>
<p> → <Text>
<img> → <Image>
<button> → <TouchableOpacity> or <Pressable>
<input> → <TextInput>
<select> → <Picker> or custom picker component
<ul>/<ol> → <FlatList> or <SectionList>
<a> → <TouchableOpacity> with navigation
<form> → <View> (no form element in RN)
```

### Styling Migration Approach

1. **NativeWind** (Recommended): 
   - Allows using Tailwind classes in React Native
   - Maintains same utility classes from web app
   - Version 4 has full feature parity including dark mode

2. **StyleSheet API** (Alternative):
   ```javascript
   // Web CSS
   className="bg-white rounded-lg shadow-md p-6"
   
   // React Native StyleSheet
   const styles = StyleSheet.create({
     card: {
       backgroundColor: 'white',
       borderRadius: 8,
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.1,
       shadowRadius: 4,
       elevation: 3, // Android shadow
       padding: 24,
     }
   });
   ```

### Navigation Architecture

- **React Navigation v7** is the standard
- Stack Navigator for hierarchical navigation
- Tab Navigator for bottom navigation
- Drawer Navigator for side menu
- Can nest navigators for complex flows

### State Management Considerations

- Current React hooks work identically in React Native
- Context API works the same
- For persistence: AsyncStorage (non-sensitive) or SecureStore (sensitive)
- Consider Zustand or Redux Toolkit if state grows complex

### Platform-Specific Code Patterns

```javascript
// Using Platform module
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 44 : 20,
  }
});

// Using file extensions
Button.ios.js     // iOS specific
Button.android.js // Android specific
Button.js         // Shared code
```

### Performance Optimization Patterns

1. **FlatList** for long lists (virtualization built-in)
2. **React.memo** for expensive components
3. **InteractionManager** for post-animation operations
4. **Image optimization** with proper sizing and caching
5. **Hermes** JavaScript engine for better performance

## 4. Step-by-Step Refactoring Roadmap

### Phase 1: Project Setup and Foundation

#### Step 1: Initialize Expo Project
```bash
npx create-expo-app beet-guru-native --template blank-typescript
cd beet-guru-native
```

#### Step 2: Install Essential Dependencies
```bash
# Core navigation
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context

# Styling (NativeWind for Tailwind support)
npm install nativewind
npm install --save-dev tailwindcss@3.3.0

# Icons (Lucide for React Native)
npx expo install lucide-react-native react-native-svg

# Storage
npx expo install @react-native-async-storage/async-storage
npx expo install expo-secure-store

# Forms
npm install react-hook-form

# Additional Expo modules
npx expo install expo-location expo-camera expo-notifications
```

#### Step 3: Configure NativeWind
Create `tailwind.config.js`:
```javascript
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#16A34A',
        'primary-dark': '#166534',
      }
    },
  },
  plugins: [],
}
```

Update `babel.config.js`:
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

#### Step 4: Set Up Project Structure
```
src/
├── components/
│   ├── assessment/
│   ├── layout/
│   ├── screens/
│   ├── ui/
│   │   ├── form/
│   │   └── common/
│   └── utility/
├── hooks/
├── navigation/
├── services/
├── utils/
├── constants/
└── types/
```

### Phase 2: Core Infrastructure Migration

#### Step 5: Migrate Utilities and Constants
- Copy `src/utils/` from web app
- Remove any browser-specific code
- Update logger for React Native console

#### Step 6: Port Custom Hooks
```javascript
// useLocalStorage → useAsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    AsyncStorage.getItem(key).then(value => {
      if (value !== null) {
        setStoredValue(JSON.parse(value));
      }
    });
  }, [key]);

  const setValue = async (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
};
```

#### Step 7: Create Navigation Structure
```javascript
// src/navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Email" component={EmailScreen} />
    <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

// Main Tab Navigator
const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Assessments" component={AssessmentsScreen} />
    <Tab.Screen name="Reports" component={ReportsScreen} />
    <Tab.Screen name="More" component={MoreScreen} />
  </Tab.Navigator>
);
```

#### Step 8: Port API Service Layer
- Copy `src/services/api.js`
- Add offline queue management:
```javascript
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

class OfflineCapableAPI {
  constructor() {
    this.queue = [];
    this.isOnline = true;
    
    NetInfo.addEventListener(state => {
      this.isOnline = state.isConnected;
      if (state.isConnected) {
        this.processQueue();
      }
    });
  }

  async queueRequest(request) {
    const queue = await AsyncStorage.getItem('api_queue') || '[]';
    const parsedQueue = JSON.parse(queue);
    parsedQueue.push(request);
    await AsyncStorage.setItem('api_queue', JSON.stringify(parsedQueue));
  }

  async processQueue() {
    const queue = await AsyncStorage.getItem('api_queue') || '[]';
    const parsedQueue = JSON.parse(queue);
    
    for (const request of parsedQueue) {
      await this.executeRequest(request);
    }
    
    await AsyncStorage.removeItem('api_queue');
  }
}
```

### Phase 3: Component Migration

#### Step 9: Create Base UI Components
Start with the atomic components that will be reused:

```javascript
// src/components/ui/common/Card.js
import { View } from 'react-native';

export const Card = ({ children, className = "" }) => {
  return (
    <View className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </View>
  );
};

// src/components/ui/common/Button.js
import { Pressable, Text } from 'react-native';

export const Button = ({ onPress, title, variant = "primary" }) => {
  const styles = {
    primary: "bg-green-600 active:bg-green-700",
    secondary: "bg-gray-200 active:bg-gray-300",
  };
  
  return (
    <Pressable 
      onPress={onPress}
      className={`px-4 py-2 rounded-md ${styles[variant]}`}
    >
      <Text className={variant === "primary" ? "text-white" : "text-gray-800"}>
        {title}
      </Text>
    </Pressable>
  );
};
```

#### Step 10: Port Form Components
```javascript
// src/components/ui/form/FormField.js
import { View, Text, TextInput } from 'react-native';

export const FormField = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder,
  secureTextEntry,
  keyboardType,
  error,
  touched 
}) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        className={`border rounded-md px-3 py-2 ${
          error && touched ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && touched && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};
```

### Phase 4: Screen Migration

#### Step 11: Migrate Authentication Screens
Start with EmailScreen as it's the entry point:

```javascript
// src/components/screens/EmailScreen.js
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { FormField } from '../ui/form/FormField';
import { Button } from '../ui/common/Button';

export const EmailScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Check if email exists
    const exists = await authAPI.checkEmailExists(data.email);
    
    if (exists) {
      // Send verification code
      await authAPI.generateVerificationCode(data.email);
      navigation.navigate('VerificationCode', { email: data.email });
    } else {
      // New user - go to registration
      navigation.navigate('Register', { email: data.email });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4">
          <View className="py-8">
            <Text className="text-2xl font-bold text-center mb-2">
              Welcome to Beet Guru
            </Text>
            <Text className="text-gray-600 text-center mb-8">
              Enter your email to get started
            </Text>
            
            <Controller
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  label="Email Address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  error={errors.email?.message}
                  touched={!!errors.email}
                />
              )}
              name="email"
            />
            
            <Button 
              title="Continue" 
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
```

#### Step 12: Migrate Core App Screens
Follow the same pattern for each screen, converting:
- `<div>` → `<View>`
- `className` → NativeWind classes
- `onClick` → `onPress`
- Forms → React Hook Form with TextInput

### Phase 5: Feature-Specific Migrations

#### Step 13: Assessment Wizard Migration
The multi-step wizard needs special attention:

```javascript
// src/components/assessment/StepProgress.js
import { View, Text } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';

export const StepProgress = ({ currentStep, steps }) => {
  return (
    <View className="mb-8">
      <Svg height="60" width="100%">
        {/* Draw line */}
        <Line
          x1="10%"
          y1="30"
          x2="90%"
          y2="30"
          stroke="#E5E7EB"
          strokeWidth="2"
        />
        
        {/* Draw progress */}
        <Line
          x1="10%"
          y1="30"
          x2={`${(currentStep / steps.length) * 80 + 10}%`}
          y2="30"
          stroke="#16A34A"
          strokeWidth="2"
        />
        
        {/* Draw circles for each step */}
        {steps.map((step, index) => (
          <Circle
            key={index}
            cx={`${(index / (steps.length - 1)) * 80 + 10}%`}
            cy="30"
            r="12"
            fill={index <= currentStep ? "#16A34A" : "#E5E7EB"}
          />
        ))}
      </Svg>
      
      {/* Step labels */}
      <View className="flex-row justify-between mt-2">
        {steps.map((step, index) => (
          <Text 
            key={index}
            className={`text-xs ${
              index <= currentStep ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            {step}
          </Text>
        ))}
      </View>
    </View>
  );
};
```

#### Step 14: Implement Native Features
Add features that weren't possible in the web version:

```javascript
// GPS Auto-detection for paddocks
import * as Location from 'expo-location';

const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }
  
  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};

// Camera for crop photos
import { Camera } from 'expo-camera';

const takeCropPhoto = async () => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }
  
  // Navigate to camera screen
  navigation.navigate('CameraCapture');
};

// Offline sync indicator
import NetInfo from '@react-native-community/netinfo';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });
    
    return unsubscribe;
  }, []);
  
  if (isOnline) return null;
  
  return (
    <View className="bg-yellow-100 p-2">
      <Text className="text-yellow-800 text-center text-sm">
        Working offline - data will sync when connected
      </Text>
    </View>
  );
};
```

### Phase 6: Testing and Optimization

#### Step 15: Set Up Testing
```bash
npm install --save-dev @testing-library/react-native jest-expo
```

Create test files following the same structure as components:
```javascript
// __tests__/EmailScreen.test.js
import { render, fireEvent } from '@testing-library/react-native';
import { EmailScreen } from '../src/components/screens/EmailScreen';

describe('EmailScreen', () => {
  it('validates email format', () => {
    const { getByText, getByPlaceholderText } = render(<EmailScreen />);
    
    const input = getByPlaceholderText('you@example.com');
    const button = getByText('Continue');
    
    fireEvent.changeText(input, 'invalid-email');
    fireEvent.press(button);
    
    expect(getByText('Invalid email address')).toBeTruthy();
  });
});
```

#### Step 16: Performance Optimization
- Use `FlatList` for all lists (locations, reports, etc.)
- Implement `React.memo` for expensive components
- Add image caching with `expo-image`
- Profile with React DevTools

#### Step 17: Build and Deploy
```bash
# Development build for testing
npx expo run:ios
npx expo run:android

# Production build with EAS
npm install -g eas-cli
eas build --platform all
```

## Migration Checklist

When migrating each component/screen, ensure:

- [ ] All `<div>` converted to `<View>`
- [ ] All text wrapped in `<Text>` components
- [ ] All `className` props work with NativeWind
- [ ] Touch handlers use `onPress` not `onClick`
- [ ] Images use `<Image>` with proper sources
- [ ] Forms use `TextInput` components
- [ ] Lists use `FlatList` for performance
- [ ] Navigation uses React Navigation
- [ ] Storage migrated to AsyncStorage/SecureStore
- [ ] Platform-specific code handled properly
- [ ] Keyboard handling implemented
- [ ] Safe area insets respected
- [ ] Error boundaries in place
- [ ] Loading states implemented
- [ ] Offline support added

## Best Practices for LLM Implementation

1. **Always test each component** after migration before moving to the next
2. **Use TypeScript** for better type safety and autocomplete
3. **Follow the existing patterns** from the web app for consistency
4. **Implement one screen at a time** to maintain working state
5. **Use the same prop names** where possible for easier migration
6. **Keep business logic separate** from UI components
7. **Test on both iOS and Android** regularly
8. **Use Expo Go** for rapid development iteration
9. **Implement error boundaries** early to catch issues
10. **Add accessibility props** (`accessibilityLabel`, `accessibilityHint`)

## Common Pitfalls to Avoid

1. **Don't use web-specific CSS** - No `:hover`, `:focus` pseudo-classes
2. **Don't forget Text components** - All text must be wrapped
3. **Don't use percentage heights** without flex
4. **Don't ignore platform differences** - Test on both platforms
5. **Don't skip keyboard handling** - Critical for forms
6. **Don't use synchronous storage** - Always use async methods
7. **Don't ignore safe areas** - Use SafeAreaView
8. **Don't hardcode dimensions** - Use Dimensions API
9. **Don't skip error handling** - Network requests can fail
10. **Don't forget touch feedback** - Users expect visual feedback

## Success Criteria

The migration is complete when:

1. All screens from web app are implemented
2. Navigation flows match web app behavior
3. Forms work with proper keyboard handling
4. Offline mode works with sync
5. Native features (GPS, camera) integrated
6. Performance is smooth (60 FPS)
7. Both iOS and Android work correctly
8. All tests pass
9. Error handling is comprehensive
10. App is ready for store submission
