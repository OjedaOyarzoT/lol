
from django.http import HttpResponse
from django.template import Context, Template, loader
from django.shortcuts import render
import json

def cargarPrincipal(request):
	plantillaExterna = loader.get_template('principal.html')
	doc = plantillaExterna.render()
	return HttpResponse(doc)

def jugador(request):
	plantillaExterna = loader.get_template('jugador.html')
	doc = plantillaExterna.render()
	return HttpResponse(doc)

def campeones(request):
    from riotwatcher import LolWatcher, ApiError

    lol_watcher = LolWatcher('RGAPI-40419e61-8c7e-47d9-8422-bb2f4f9c4297')


    versions = lol_watcher.data_dragon.versions_for_region(my_region)
    champions_version = versions['n']['champion']

    current_champ_list = lol_watcher.data_dragon.champions(champions_version)
    js_data = json.dumps(current_champ_list)

    plantillaExterna = loader.get_template('campeones.html')

    return HttpResponse(plantillaExterna.render({'my_data': js_data}))