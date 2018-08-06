package host.exp.exponent;

// import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

import expolib_v1.okhttp3.OkHttpClient;

// Needed for `react-native link`
//import com.facebook.react.ReactApplication;
import com.calendarevents.CalendarEventsPackage;
import com.ioddly.alarms.AlarmPackage;

public class MainApplication extends ExpoApplication {

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  // Needed for `react-native link`
  public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        // Needed for `react-native link`
        // new MainReactPackage(),
          new AlarmPackage(),
        new CalendarEventsPackage()
    );
  }

  @Override
  public String gcmSenderId() {
    return getString(R.string.gcm_defaultSenderId);
  }

//   @Override
   public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
     CalendarEventsPackage.onRequestPermissionsResult(requestCode, permissions, grantResults);
//    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
   }

  @Override
  public boolean shouldUseInternetKernel() {
    return BuildVariantConstants.USE_INTERNET_KERNEL;
  }

  public static OkHttpClient.Builder okHttpClientBuilder(OkHttpClient.Builder builder) {
    // Customize/override OkHttp client here
    return builder;
  }
}
