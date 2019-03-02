
## Kafli 1
1. What is a “standalone” headset?
  * A self-contained HMD that does not require external processors or power

3. How would you best define augmented reality?
  * An overlay of digital objects and information onto the real world

3. Project Tango enabled...
 * Smartphone-based AR

4. How have AR apps showcasing furniture enhanced the home shopping experience?
 * You can see a potential purchase digitally overlaid in your real-life space

5. What is one way AR can currently enhance social media?
 * It allows users to digitally augment and manipulate faces

---
## Coursera kafli 2
1. What is a drawback of outside-in tracking?
 * Less portable

2. With outside-in tracking, sensors are housed within the AR device itself.
 * False

3. Which of the following devices uses inside-out tracking?
 * Google Pixel smartphone

4. How does ARCore understand the phone’s position and orientation relative to the world around it?
 * Through Concurrent Odometry and Mapping (COM)

5. Clusters of feature points on a surface are used to create:
 * A plane

6. As you walk around an AR experience with your phone, errors accumulate and a device’s position and orientation may shift. What is this called?
 * Drift

7. Which best describes feature points?
 * Visually distinct features in your real world environment

8. Which of the following is not a technical constraint facing current smartphone AR technology?
 * Scope

9. The benefit of inside-out tracking is…
 * The user doesn’t need external sensors to track the AR device

10. A computer mouse is an example of a User Interface Metaphor.
  * True

---
## Coursera kafli 3
1. ARCore is available in China
 * True

2. ARcore has a hard time detecting feature points on..
 * Smooth white surfaces

3. Who are team members you should consider hiring to build your ARCore experience?
 * All of the above

4. All Android phones on the market are compatible to run ARCore.
 * False

5. When considering UX/UI, one good rule of thumb to remember with AR is:
 * Avoid cluttering the screen with too many buttons or elements that might be confusing to users.

6. It is a good idea to use as many photorealistic assets in your AR project as possible.
 * False

7. What might break immersion in an AR app?
 * All of the above

8. To create your own AR project it is imperative to learn 3D modelling tools like Maya, ZBrush, and 3ds max.
 * False

9. When it comes to UX and UI:
 * They are complementary fields of product design, and generally speaking UX is the more technical of the two

10. Drag and drop, Voice, Tap, Pinch and Zoom, Slide, and Tilting are all examples of what?
 * Basic interaction options

---
Coursera kafli 4
Hit-testing
A & C

1. Is it possible to download assests into your game during runtime using Google Poly?
 * Yes

2. What is a popular game engine used for creating AR experiences
 * Unity

3. Which file formats does Poly support?
 * .obj

4. It is advisable to anchor a digital object to a dynamically moving real world object.
 * False

5. Why is determining the pose of the virtual camera and the real world important for AR apps?
 * All of the above

6. Currently digital objects can only occlude, or block, other digital objects and not real world objects.
    * False

7. How does surface detection help produce AR experiences in ARCore?
    * All of the above

8. You can use VR creation tools like Tilt Brush and Blocks to build 3D assets and store them on Poly for use in AR apps.
    * True

9. Google Poly is an online library where people can browse, share, and remix 3D assets.
 * True
 
 ---
 
 
 ## 2. HelloAR app prófun og kóðarýning í snjallsíma. (5%).
 
* Hluti 1
   * [https://youtu.be/BNP5U8BmpgY](https://youtu.be/BNP5U8BmpgY)

* Hluti 2
    * [https://youtu.be/oKIApn400Jw](https://youtu.be/oKIApn400Jw)
    

Hérna er partur af kóðanum. Með commentum.
 

```c#
public void Update()
{
    _UpdateApplicationLifecycle();
    //Felur skilaborðið sem kemur þegar þú opnar appið, þegar það er búið að finna stað til að setja hlutinn á.
    Session.GetTrackables<DetectedPlane>(m_AllPlanes);
    bool showSearchingUI = true;
    for (int i = 0; i < m_AllPlanes.Count; i++)
    {
        if (m_AllPlanes[i].TrackingState == TrackingState.Tracking)
        {
            showSearchingUI = false;
            break;
        }
    }

    SearchingForPlaneUI.SetActive(showSearchingUI);


    Touch touch;
    if (Input.touchCount < 1 || (touch = Input.GetTouch(0)).phase != TouchPhase.Began)
    {
        return;
    }

    // Finnur hvar á sjánum notandinn ýtti til þessa að setja hlutinn á skjáinn.
    TrackableHit hit;
    TrackableHitFlags raycastFilter = TrackableHitFlags.PlaneWithinPolygon |
    TrackableHitFlags.FeaturePointWithSurfaceNormal;
}


private void _UpdateApplicationLifecycle()
{
    // Slekkur á appi þegar það er ýtt á back takkann.
    if (Input.GetKey(KeyCode.Escape))
    {
        Application.Quit();
    }
    // Þegar forritið er að trakka banna það símanum að slökkva á sér(læsa sér)
    if (Session.Status != SessionStatus.Tracking)
    {
        const int lostTrackingSleepTimeout = 15;
        Screen.sleepTimeout = lostTrackingSleepTimeout;
    }
    else
    {
        Screen.sleepTimeout = SleepTimeout.NeverSleep;
    }

    if (m_IsQuitting)
    {
        return;
    }

    // Forritið hættir ef það er einhvað vanda mál með síma, t.d ekki búinn að fá leyfa á að nota myndavélina.
    if (Session.Status == SessionStatus.ErrorPermissionNotGranted)
    {
        _ShowAndroidToastMessage("Camera permission is needed to run this application.");
        m_IsQuitting = true;
        Invoke("_DoQuit", 0.5f);
    }
    else if (Session.Status.IsError())
    {
        _ShowAndroidToastMessage("ARCore encountered a problem connecting.  Please start the app again.");
        m_IsQuitting = true;
        Invoke("_DoQuit", 0.5f);
    }
}


private void _DoQuit()
{
    Application.Quit();
}


private void _ShowAndroidToastMessage(string message)
{
    AndroidJavaClass unityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
    AndroidJavaObject unityActivity = unityPlayer.GetStatic<AndroidJavaObject>("currentActivity");
    if (unityActivity != null)
    {
        AndroidJavaClass toastClass = new AndroidJavaClass("android.widget.Toast");
        unityActivity.Call("runOnUiThread", new AndroidJavaRunnable(() =>
        {
            AndroidJavaObject toastObject = toastClass.CallStatic<AndroidJavaObject>("makeText", unityActivity,
            message, 0);
            toastObject.Call("show");
        }));
    }
}

```
---

## 3. Tilraun: Búðu til lítið AR verkefni sem vinnur með 2D myndgreiningu að eigin vali. Skrifaðu athugasemdir (e. comments) á íslensku í kóðaskrá. Það má vinna með e. tutorial (4%)

* [https://youtu.be/miPtVkpLnTA](https://youtu.be/miPtVkpLnTA)


Hérna er partur af kóðanum. Með commentum.
 

```c#
// Slekkur á appinu þega það er ýtt á backtakkann.
if (Input.GetKey(KeyCode.Escape))
{
    Aplication.Quit();
}

//Gáir hvor það er verið að fylgast með hreyfingum.
if (Session.Status != SessionStatus.Tracking)
{
  return;
}

// Sækir myndina sem á að sýna.
Session.GetTrackables<AugmentedImage>(m_TempAugmentedImages, TrackableQueryFilter.Updated);

foreach (var image in m_TempAugmentedImages)
{
    AugmentedImageVisualizer visualizer = null;
    m_Visualizers.TryGetValue(image.DatabaseIndex, out visualizer);
    //Ef forritið skinjar mynd sem það þekkir.
    if (image.TrackingState == TrackingState.Tracking && visualizer == null)
    {
        AugmentedImageVisualizerPrefab.gameObject.SetActive(true);
        //Býr til fastan púnt svo forritið veit hvar hlutirinn á að vera.
        Anchor anchor = image.CreateAnchor(image.CenterPose);
        visualizer = (AugmentedImageVisualizer)Instantiate(AugmentedImageVisualizerPrefab, anchor.transform);
        visualizer.Image = image;
        m_Visualizers.Add(image.DatabaseIndex, visualizer);
    }
    else if (image.TrackingState == TrackingState.Stopped && visualizer != null)
    {
        m_Visualizers.Remove(image.DatabaseIndex);
        GameObject.Destroy(visualizer.gameObject);
    }
}

// Þetta sýrnir kassa sem sýrnir hvar myndin sem forritir skannar á að vera á skjánum. 
foreach (var visualizer in m_Visualizers.Values)
 {
    if (visualizer.Image.TrackingState == TrackingState.Tracking)
    {
        FitToScanOverlay.SetActive(false);
        return;
    }
}

```


 