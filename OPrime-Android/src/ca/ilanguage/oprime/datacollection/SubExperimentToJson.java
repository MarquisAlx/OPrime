package ca.ilanguage.oprime.datacollection;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import com.github.opensourcefieldlinguistics.fielddb.model.SubExperimentBlock;

import android.app.IntentService;
import android.content.Intent;
import android.util.Log;
import ca.ilanguage.oprime.Config;

public class SubExperimentToJson extends IntentService {

  public SubExperimentToJson() {
    super("SubExperimentToJson");
  }

  public SubExperimentToJson(String name) {
    super(name);
  }

  @Override
  protected void onHandleIntent(Intent intent) {
    SubExperimentBlock subex = (SubExperimentBlock) intent.getExtras().getSerializable(Config.EXTRA_SUB_EXPERIMENT);
    String resultsFile = subex.getResultsFileWithoutSuffix().replace("video", "touchdata") + ".json";
    File outfile = new File(resultsFile);
    try {
      FileOutputStream out = new FileOutputStream(outfile, false);
      out.write(subex.getResultsJson().getBytes());
      out.flush();
      out.close();
    } catch (FileNotFoundException e) {
      Log.e(Config.TAG, "FileNotFoundException Problem opening outfile.");

    } catch (IOException e) {
      Log.e(Config.TAG, "IOException Problem writing outfile.");
    }
    if (Config.D)
      Log.d(Config.TAG, "Done service.");
  }

}
