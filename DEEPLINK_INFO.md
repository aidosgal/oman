# Deep Link Configuration

## Wallet Page Deep Links

The wallet page can be accessed via deep links with the wallet UUID.

### Link Formats

#### 1. **Development (Expo Go)**
```
exp://192.168.x.x:8081/--/wallet/700a1bff-f624-4b88-828b-3dbcbcb55986
```
Replace `192.168.x.x` with your local IP address shown in Expo.

#### 2. **Custom Scheme (Production)**
```
myapp://wallet/700a1bff-f624-4b88-828b-3dbcbcb55986
```

#### 3. **Universal Link Format**
```
https://yourapp.com/wallet/700a1bff-f624-4b88-828b-3dbcbcb55986
```

### Configuration Required

Add this to your `app.json`:

```json
{
  "expo": {
    "scheme": "myapp",
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### Testing Deep Links

#### iOS Simulator
```bash
xcrun simctl openurl booted myapp://wallet/700a1bff-f624-4b88-828b-3dbcbcb55986
```

#### Android Emulator
```bash
adb shell am start -W -a android.intent.action.VIEW -d "myapp://wallet/700a1bff-f624-4b88-828b-3dbcbcb55986"
```

#### In App Navigation (React Native)
```typescript
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/wallet/700a1bff-f624-4b88-828b-3dbcbcb55986');
```

### Example Usage

```typescript
// Navigate to wallet page with specific UUID
router.push('/wallet/700a1bff-f624-4b88-828b-3dbcbcb55986');

// Or use string interpolation
const walletId = "700a1bff-f624-4b88-828b-3dbcbcb55986";
router.push(`/wallet/${walletId}`);
```
