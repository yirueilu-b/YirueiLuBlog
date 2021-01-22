# Basic Operations in OpenCV-Python

Take a note of some basic and common operations in OpenCV-Python. I also write the note in Jupyter notebook and the code is at [here](https://). OpenCV is one of the most popular library. It includes hundreds of computer vision algorithms and its speed is relatively higher than other libraries such as Pillow and scikit-image in Python.

## Environment

- Windows 10
- Python 3.6.8
- jupyter 1.0.0
- opencv-python 4.4.0.42

## Read Image

**Function**

```python
cv2.imread(filename, flag)
```
> `flag`: the way image to be read
> - `cv2.IMREAD_COLOR`: default value, could pass int 1 intead the string, read image in BGR ( 3 channel )
> - `cv2.IMREAD_GRAYSCALE`: could pass int 0 intead the string, read image in grayscale ( 1 channel )
> - `cv2.IMREAD_UNCHANGED`: could pass int -1 intead the string, read image in BRGA mode ( 4 channel )

**Example**

```python
# read with different flags
image = cv2.imread(IMAGE_PATH)
image_bgr = cv2.imread(IMAGE_PATH, 1)
image_gray = cv2.imread(IMAGE_PATH, 0)
image_bgra = cv2.imread(IMAGE_PATH, -1)
# show the images and shape of images
# OpenCV-Python read image in HWC ( Height, Width, Channel ) format

# Matplotlib show images with RGB color 
# therefore the image seems strange before converting color space
plt.figure(figsize=(8, 7))
plt.subplot(221)
plt.title(("shape of image: %s" % (image.shape, )))
plt.imshow(image)
plt.subplot(222)
plt.title(("shape of image_bgr: %s" % (image_bgr.shape, )))
plt.imshow(image_bgr)
plt.subplot(223)
plt.title(("shape of image_gray: %s" % (image_gray.shape, )))
plt.imshow(image_gray, cmap='gray')
plt.subplot(224)
plt.title(("shape of image_bgra: %s" % (image_bgra.shape, )))
plt.imshow(image_bgra)
plt.tight_layout()
plt.show()
```
![](https://i.imgur.com/INQBQvX.png)


## Write Image

**Function**

```python
cv2.imwrite(filename, image)
```

**Example**

```python
# write the image to the OUTPUT_PATH then read it
cv2.imwrite(OUTPUT_PATH, image)
output_image = cv2.imread(OUTPUT_PATH)
# show the image
plt.figure(figsize=(6, 6))
plt.imshow(output_image)
plt.show()
```
![](https://i.imgur.com/foia96R.png)


## Convert Color Space of Image

**Function**

```python
cv2.cvtColor(input_image, flag)
```
> `flag`: the type of conversion
> - `cv2.COLOR_BGR2HSV`
> - `cv2.COLOR_BGR2GRAY`
> - ...

> There are 274 types of conversion in total, we could check the types with the code below.
> ```python
> flags = [i for i in dir(cv2) if i.startswith('COLOR_')]
> [print(flag) for flag in flags[:5]]
> print('...')
> print("There are %s types in total" % len(flags))
> ```
> ```
> COLOR_BAYER_BG2BGR
> COLOR_BAYER_BG2BGRA
> COLOR_BAYER_BG2BGR_EA
> COLOR_BAYER_BG2BGR_VNG
> COLOR_BAYER_BG2GRAY
> ...
> There are 274 types in total
> ```

**Example**

```python
image = cv2.imread(IMAGE_PATH)
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
image_hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

plt.figure(figsize=(8, 7))
plt.subplot(221)
plt.title("Default BGR")
plt.imshow(image)
plt.subplot(222)
plt.title("RGB")
plt.imshow(image_rgb)
plt.subplot(223)
plt.title("Gray")
plt.imshow(image_gray, cmap='gray')
plt.subplot(224)
plt.title("HSV")
plt.imshow(image_hsv)
plt.tight_layout()
plt.show()
```
![](https://i.imgur.com/1OeNmav.png)

> Since the image is just a numpy array, we could just manipulate the array like the code below to convert image between BGR and RGB
> ```python
> # reverse the order of channel, i.e. [B, G, R] to [R, G, B]
> image = image[:,:,::-1]
> ```

## Resize

**Function**

```python
cv2.resize(img, None, fx, fy, interpolation)
# or
cv2.resize(img, (width, height), interpolation)
```

> `fx`: scale factor along the horizontal axis
> `fy`: scale factor along the vertical axis
> `interpolation`: 
> - `INTER_NEAREST`
> - `INTER_LINEAR`
> - `INTER_AREA`
> - `INTER_CUBIC`
> - `INTER_LANCZOS4`

**Example**

```python
image = cv2.imread(IMAGE_PATH)[:,:,::-1]
height, width = image.shape[:2]
image_enlarge = cv2.resize(image, None, fx=2.1, fy=2.1, interpolation=cv2.INTER_NEAREST)
image_2x = cv2.resize(image, (width*2, height*2), cv2.INTER_LINEAR)
image_new_ratio = cv2.resize(image, (width*3, height*2), cv2.INTER_CUBIC)

plt.figure(figsize=(8, 7))
plt.subplot(221)
plt.title(("shape of image: %s" % (image.shape, )))
plt.imshow(image)
plt.subplot(222)
plt.title(("shape of image_enlarge: %s" % (image_enlarge.shape, )))
plt.imshow(image_enlarge)
plt.subplot(223)
plt.title(("shape of image_2x: %s" % (image_2x.shape, )))
plt.imshow(image_2x)
plt.subplot(224)
plt.title(("shape of image_new_ratio: %s" % (image_new_ratio.shape, )))
plt.imshow(image_new_ratio)
plt.tight_layout()
plt.show()
```
![](https://i.imgur.com/yTwEUT2.png)

> To Be Continued...

###### tags: `Coding`