# LPPWM - SoundboardApp
This project is a Soundboard app made in React Native. It was realized for the professional bachelor's degree *Web and Mobile Project* of *Sorbonne University*.

## Overview
The app uses a tab navigation with two screens: the "Soundboard" screen and the "Library" screen.

The "Soundboard" screen allows the user to play sounds by pressing the different pads of the soundboard.
The user can switch between three soundboards ("A", "B" and "C").
Each soundboard is customizable by long pressing the soundboard selector. It opens a modal asking for the size of the soundboard. Four sizes are availables.
The pads can also be customized by long pressing them. The color and sound can be changed. The song can be selected amoung one of the songs of the library, and can be cropped for this specific pad.

The "Library" screen is used to manage the sounds. Some default sounds are provided but the user can also search for sounds in the Freesound API or record sounds with their phone. Recorded sounds can have a custom name, but not downloaded sounds. Default sounds cannot be removed.

## Nagivation
Two navigators are used in the app and can be found in the `/navigators` folder.

### Main Navigator
The `MainNavigator` is the higher app navigator.
It is mostly used to easily diplay a header on all of the app screens.
But it is also here to make it easier for future features to be added.

### TabNavigator
The `TabNavigator` is the only way to navigate through the app at this stage.
It has two screens, the `SoundboardScreen` and the `LibraryScreen`, that can be found in the `/screens` folder.

### Modals
Some modals and bottom sheet components (in `/components/modals`) are used everywhere in the app to avoid screen navigation and make the user experience better.
The `EditSoundboardModal` shows the form to edit soundboards.  
The `EditPadModal` shows the form to edit the soundboards pads.
The `SoundInfoModal` displays informations about the sound, a player to play the sound and action buttons.
The `SelectSoundBottomSheet` allows the user to select a sound in the library sounds.
The `DownloadSoundBottomSheet` allows the user to search sounds in the Freesound API.
The `RecorderBottomSheet` allows the users to record, name and save a sound.

## Saving the app state
The app state (soundboards and sounds) is managed with redux along with the persist store package, so all the user modifications stays when leaving the app.

### The `library` slice
The `library` slice manage the sounds. It contains a list of sounds having the following properties:
* `id` - the unique identifier of the sound in the app. For default sounds, the id is the sound name in kebab case preceeced by `default-`. Ex: `default-snare-808` for `Snare 808`. The other sounds (records and downloads) are given a unique identifier using the `uuid` package. Ex: `1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed`.
* `type` - the type of the sound can be `default`, `record`, `downloaded` or `freesound`. The `downloaded` and `freesound` types both indicates that the sound comes from the Freesound API but the first one has been downloaded by the user and can be used in a soundboard, while the second one has not been download and cannot be used yet.
* `name` - the name of the sound. Default and Freesound sounds name cannot be changed, but records can.
* `uri` - the uri of the sound file on the device.

### The `soundboard` slice
The `soundboard` slice contains the list of the soundboards. A soundboard is a grid of pads.
There are three soundboards. This number cannot be changed by the user.
Each soundboard has the following properties:
* `name` - the name of the sounboard (`A`, `B` or `C`).
* `numberOfRows` - numbers rows of the soundboard (number of pads verticaly)
* `numberOfColumns` - numbers columns of the soundboard (number of pads horizontaly)
* `pads` - the list of pads of the soundboard. If the number of pads is lower than `numberOfRows * numberOfColumns`, missing pads will have the default pad configuration from the `/constants/pads.js` file. If it is higher, the pad overflow will be ignored.

The pads have the following properties:
* `color` - the color of the pad. Is it a string that must match a key of the avaibles colors object from the `/constants/pads.js` file.
* `sound` - the id of the sound of the pad
* `crop` - how to crop the sound for this pad. If `null`, the sound will not be cropped. Else crop must have the format `[startAtMillis, endAtMillis]`.

## Known issues
I noticed some issues that I did not had the time to fix. Most of them are irelevant though.
1. Quickly double-pressing pads will not play the sound twice. Pressing a pad while its sound is playing will stop it first then play it. Theses issues are related to the use of `Audio.Sound.replayAsync()` instead of `Audio.Sound.playAsync()`. Yet I use the first method because it has less delay between the moment the pad is pressed and the moment the sound actually plays.
2. When loading a lot of sounds from the Freesound API, some may not load. Some optimization and cleanup in `useEffect` function could fix that.
3. A warning sometimes shows: `cannot update an umounted component`. This could be fixed by adding cleanup in the `useEffect` method that create this warning.

## Testing
The application have been tested only on an android device. Some bugs may be found on iOS.