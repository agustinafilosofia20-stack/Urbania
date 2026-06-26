import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image


model = nn.Linear(224 * 224 * 3, 4)


def analyze_image(image):

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])

    img = Image.open(image).convert("RGB")

    img_tensor = transform(img)

    img_tensor = img_tensor.unsqueeze(0)

    img_tensor = img_tensor.view(1, -1)

    output = model(img_tensor)

    categories = [
        "plastico",
        "carton",
        "vidrio",
        "residuo urbano"
    ]

    prediction = torch.argmax(output, dim=1).item()

    confidence = round(torch.softmax(output, dim=1).max().item() * 100, 2)

    return {
        "category": categories[prediction],
        "confidence": confidence
    }