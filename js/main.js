var app = {};
var Castagram = function(container, botaoPesquisa, inputPesquisa) {
	castagram =  {
		fotos: [],
		montaTemplate: function(){	
			castagram.fotos = self.fotos;
			container.html('');
			for(index in castagram.fotos) {
				console.log(fotos[index]);
				foto = "<div class='instagram clearfix'>"+
								"<div class='usuario'><img src='" + fotos[index].profile_foto + "' class='foto-usuario'/></div>"+
				        		"<div class='likes'>" + fotos[index].likes + "</div>"+
				        		"<img src='" + fotos[index].foto + "' class='foto'>" +
			        		"</div>";
				container.prepend(foto);

			}
		},
		pesquisa: function(dados){
			var q = inputPesquisa.val(),
				access_token = '295280509.d36573b.b64ccaef576d4616822cae6f1ee46ef9',
				url = 'https://api.instagram.com/v1/tags/' + q + '/media/recent?access_token='
				+ access_token + '',
    			self = castagram;    		
			$.ajax({
			  url: url,
			  type: 'GET',
			  dataType: 'jsonp',
			  success: self.pesquisaSucesso,
			  error: self.pesquisaErro
			});				
		},
		pesquisaSucesso: function(data, textStatus, xhr){
			if((data.data === undefined)) {
					self.fotos = [];				
			} else {
				self.fotos = [];
			    self.fotos = $.map(data.data, function(photo) {
					photoText = '';
					if(photo.caption !== null) {
						photoText = photo.caption.text;
					}
					return {
						username: photo.user.username,
						profile_foto: photo.user.profile_picture,
						profile_url: 'http://instagram.com/' + photo.user.username,
						text: photoText,
						foto: photo.images.standard_resolution.url,
						foto_url: photo.link,
						created: new Date(photo.created_time * 1000),
						likes: photo.likes.count,
						from: 'instan'
			    	};
				});
			}
			castagram.montaTemplate();
		},
		pesquisaErro: function(){self.fotos = [];}
	}
	return castagram;
};

$(document).ready(function(){
	app = Castagram($('.main'), $('.btn'), $('.pesquisa'));
	$('.pesquisa').val('castanhal');
	app.pesquisa();

	$('.btn').on('click', app.pesquisa);
});