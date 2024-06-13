# Generated by Django 5.0.6 on 2024-05-27 09:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music_auth', '0006_alter_favorite_id_alter_track_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='track',
            name='money',
            field=models.IntegerField(default=10000),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='favorite',
            unique_together={('user_id', 'track_id')},
        ),
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('track', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='music_auth.track')),
            ],
        ),
    ]
