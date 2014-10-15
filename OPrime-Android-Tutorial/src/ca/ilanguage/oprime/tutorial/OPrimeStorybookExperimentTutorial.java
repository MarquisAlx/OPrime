package ca.ilanguage.oprime.tutorial;

import java.io.File;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.List;

import com.github.opensourcefieldlinguistics.fielddb.storybook.ui.StoryBookSubExperiment;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.content.res.TypedArray;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

public class OPrimeStorybookExperimentTutorial extends Activity {
  private String mParticipantId = Config.DEFAULT_PARTICIPANT_ID;
  private String mExperimentTrialHeader = "";
  private Boolean mReplayMode = false;
  private Boolean mReplayBySubExperiments = false;
  private String mCurrentSubExperimentLanguage = Config.FRENCH;
  public long mExperimentLaunch;
  public long mExperimentQuit;

  public ArrayList<String> mSubExperimentParticipantVideos = new ArrayList<String>();
  public ArrayList<String> mParticipantsCodesCompleted = new ArrayList<String>();

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    final boolean fileManagerAvailable = isIntentAvailable(this,
       Config.INTENT_START_STORY_BOOK_SUB_EXPERIMENT);
    if (!fileManagerAvailable) {
      Toast
          .makeText(
              getApplicationContext(),
              "To run the experiment you need the OPrime app on Google Play "
                  + "it allows you to show your stimuli as a 'book' and records the data for you.",
              Toast.LENGTH_LONG).show();
      Intent goToMarket = new Intent(Intent.ACTION_VIEW).setData(Uri
          .parse("market://details?id=ca.ilanguage.oprime"));
      startActivity(goToMarket);

    } else {
      initExperiment();
      launchExperiment();
    }
    
  }

  private void initExperiment() {
    String firstname =  "none";
    String lastname = "nobody";
    String experimenter =  "AA";
    String testDayNumber = "0";
    String participantNumberOnDay ="0";
    mReplayMode = false;
    if (mReplayMode) {
      // findVideosWithSubstring(prefs.getString(PreferenceConstants.PREFERENCE_REPLAY_PARTICIPANT_CODE,
      // ""));
      mReplayBySubExperiments = true;
      findParticipantCodesWithResults();
      findVideosWithSubstring("_");
      // mWebView.loadUrl("file:///android_asset/bilingual_aphasia_test_home.html");
    } else {
      mReplayBySubExperiments = false;
    }
    String mTabletOrPaperFirst = "T";
    String participantGroup = "F"; // participants worst language is
    // English, so they get english first.
    mCurrentSubExperimentLanguage = "fr";

    /*
     * Build the participant ID and save the start time to the preferences.
     */
    mParticipantId = participantGroup + mTabletOrPaperFirst + testDayNumber
        + experimenter + participantNumberOnDay
        + firstname.substring(0, 1).toUpperCase()
        + lastname.substring(0, 1).toUpperCase();
    mExperimentLaunch = System.currentTimeMillis();
    mExperimentTrialHeader = "ParticipantID,FirstName,LastName,WorstLanguage,FirstBat,StartTime,EndTime,ExperimenterID"
        + ":::==="
        + mParticipantId
        + ","
        + firstname
        + ","
        + lastname
        + ","
        + participantGroup
        + ","
        + mTabletOrPaperFirst
        + ","
        + mExperimentLaunch + ",";

  }

  public static boolean isIntentAvailable(Context context, String action) {
    final PackageManager packageManager = context.getPackageManager();
    final Intent intent = new Intent(action);
    List<ResolveInfo> list = packageManager.queryIntentActivities(intent,
        PackageManager.MATCH_DEFAULT_ONLY);
    return list.size() > 0;
  }

  public int findVideosWithSubstring(final String substring) {
    if (substring.length() < 1) {
      return 0;
    }
    mSubExperimentParticipantVideos = new ArrayList<String>();
    File dir = new File(Config.DEFAULT_OUTPUT_DIRECTORY);
    FilenameFilter filter = new FilenameFilter() {
      public boolean accept(File dir, String name) {
        return (name.contains(substring) && name.endsWith("3gp"));
      }
    };
    File[] files = dir.listFiles(filter);
    if (files == null) {
      // Either dir does not exist or is not a directory
      return 0;
    } else {
      for (int k = files.length - 1; k >= 0; k--) {
        mSubExperimentParticipantVideos.add(files[k].toString());
      }
    }

    // Toast.makeText(
    // getApplicationContext(),
    // mSubExperimentParticipantVideos.toString().replaceAll(OUTPUT_DIRECTORY,
    // ""),
    // Toast.LENGTH_LONG).show();
    return mSubExperimentParticipantVideos.size();

  }

  public String findParticipantCodesWithResults() {
    mParticipantsCodesCompleted = null;
    mParticipantsCodesCompleted = new ArrayList<String>();
    File dir = new File(Config.DEFAULT_OUTPUT_DIRECTORY);

    File[] files = dir.listFiles();
    if (files == null) {
      // Either dir does not exist or is not a directory
      return "";
    } else {
      mParticipantsCodesCompleted.add("Play All");
      for (int k = files.length - 1; k >= 0; k--) {
        String file = files[k].toString();
        String[] pieces = file.split("_");
        if (pieces != null && pieces.length > 1) {
          if (mParticipantsCodesCompleted.contains(pieces[1])) {
            // dont add it
          } else {
            mParticipantsCodesCompleted.add(pieces[1]);
          }
        }
      }
    }
    // CharSequence[] temp = mParticipantsCodesCompleted.toArray(new
    // CharSequence[mParticipantsCodesCompleted.size()]);
    // int tempsize = temp.length;

    return mParticipantsCodesCompleted.toString();

  }

  private void launchExperiment() {
    Intent intent;
    intent = new Intent(this, StoryBookSubExperiment.class);

    /* add extra with the stimuli */
    intent.putExtra(Config.EXTRA_STIMULI, initializeStimuli());
    intent.putExtra(Config.EXTRA_LANGUAGE, mCurrentSubExperimentLanguage);
    
//    intent.putExtra(Config.EXTRA_RESULT_FILENAME, "");
//    intent.putExtra(Config.EXTRA_TAKE_PICTURE_AT_END, "");
//    intent.putExtra(Config.EXTRA_TWO_PAGE_STORYBOOK, "");
//    intent.putExtra(Config.EXTRA_USE_FRONT_FACING_CAMERA, "");
    intent.putExtra(Config.EXTRA_EXPERIMENT_TRIAL_INFORMATION, mExperimentTrialHeader);

    startActivity(intent);
  }


  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    switch (requestCode) {
    case Config.CODE_EXPERIMENT_COMPLETED:
      Log.d(Config.TAG, "The experiment is complete here you can do anything you want with the results. ");
      break;
   
    default:
      break;
    }
  }

  @Override
  public void onDestroy() {
 // this shouldn't be needed.
    mExperimentQuit = System.currentTimeMillis();
    String participantSession = mExperimentTrialHeader + mExperimentQuit +",UnknownExperimenter";
    Log.d(Config.TAG, participantSession);
    
    /*
     * TODO save participant session result to outfile
     */

    /*
     * Reset the participant details from the settings so that they wont be
     * saved on the next participant.
     */
    
    super.onDestroy();

  }

}
