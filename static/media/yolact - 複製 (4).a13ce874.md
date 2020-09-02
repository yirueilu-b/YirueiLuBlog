# YOLACT & YOLACT++

YOLACT ( You Only Look At CoefficienTs ) is a real-time instance segmentation. It's different from the previous state-of-the-art models like Mask RCNN. This paper proposed **one-stage** method to speed up instance segmentation task. The key points of this paper is to **divide the whole task into two simpler and parallel subtasks**: 

- (1) Generate **prototype masks**

- (2) Calculating the **mask coefficients** for each instance.

![enter image description here](https://i.imgur.com/RXhBAbe.png)

## How YOLACT Work

$\textsf{Original Image} \Rightarrow \textsf{Backbone} \Rightarrow \textsf{Feature Pyramid}$ 

$\begin{cases}
\Rightarrow \textsf{Protonet ( Branch 1 ): Generate masks by Protonet}
\\
\\
\Rightarrow  \textsf{ Prediction Head ( Branch 2 ):  Detect using }  P_3  \textsf{ to }  P_7 \textsf{ layers then run NMS}
\end{cases}$

$\Rightarrow \textsf{Mask Assembly: Assemble the results from Branch 1 ( Masks ) and Branch 2 ( Mask coefficients ) to generate prediction}$ 

## Detail of Structure

### Backbone

Extract features from original image 

- Use ResNet-101 by Default

### Feature Pyramid

Extract the top layer from backbone then use FPN to create a feature pyramid

- $P_3$ layer is the input of Protonet ( Branch 1 )

- $P_3$ to $P_7$ layers are the input of Head Architecture ( Branch 2 )

### Protonet ( Branch 1 )

Take the largest layer $P_3$ from feature pyramid then upsample it to produce $k$ masks 

- Upsampling to one fourth the dimensions of the input image to increase performance on small objects.

- default input image is 550 $\times$ 550 thus the output size of Protonet is 138 $\times$ 138

- Use deeper backbone could produce better mask

- Higher resolution could result in better performance on small object and better mask

![enter image description here](https://i.imgur.com/cy74jYr.png)

### Head Architecture ( Branch 2 )

Take $P_3$ to $P_7$ as input then output the class, box coordinate and mask coefficient 

- Base on RetinaNet but more lightwight

- Add extra output mask coefficient for more stable result ( see the right part of Figure 4 )

- For nonlinearity, the coefficient being -1 to 1 is important ( support subtraction on prototype )  so the activation function here is $tanh$

![enter image description here](https://i.imgur.com/Kbf2wri.png)

### Mask Assembly

For obtaining the result masks of the instances, we need to combine the prototypes and mask coefficients. 

$M = \rho(PC^T)$

- M: final mask ( $h\times w$ )
- $\rho$ : sigmoid function
- P: prototype masks ( $h \times w \times k$ )
- C: mask coefficients ( $n \times k$ )
- $h$ : height of prototype masks
- $w$ : width of prototype masks
- $k$ : number of prototype masks default: 32
- $n$ : number of instances after filtering by NMS and score threshold

# YOLACT++

Improve performance while keeping the model real-time

## Fast Mask Re-Scoring Network

This method is for better correlating the class confidence with mask quality

![enter image description here](https://i.imgur.com/WAMcbZX.png)

- Fast Mask Re-Scoring Network Increase 1.2 ms time cost for each frame ( fps from 34.4 to 33 )

- Mask Re-Scoring Network Increase 28 ms time cost for each frame ( fps from 34.4 to 17.5 )

- The speed difference mainly comes from MS R-CNN’s usage of the ROI align operation, its fc layers, and the feature concatenation in the input.

## Deformable Convolution

![](https://i1.kknews.cc/SIG=265ufti/ctp-vzntr/153777271997011r5s18s32.jpg)

![](https://i2.kknews.cc/SIG=10v8fa5/ctp-vzntr/153777283870833132qp115.jpg)

## Optimized Prediction Head

![](https://i.imgur.com/uwLZZh9.png)

# Reference
- [YOLACT github of original author](https://github.com/dbolya/yolact)

- [YOLACT++ Better Real-time Instance Segmentation](https://arxiv.org/pdf/1912.06218.pdf)

- [YOLACT Real-time Instance Segmentation](https://arxiv.org/pdf/1904.02689.pdf))

- [当前最快的实例分割模型：YOLACT 和 YOLACT++](https://xiangqianma.github.io/shen-du-xue-xi/shi-li-fen-ge/yolact-and-yolact/)
